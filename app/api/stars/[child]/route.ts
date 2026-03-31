import { supabase, StarTrackerRow } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ child: string }> }
) {
  const { child: childParam } = await params;
  const child = childParam.toLowerCase();

  if (!['emerson', 'avery'].includes(child)) {
    return NextResponse.json({ error: 'Invalid child name' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('startracker_stars')
      .select('*')
      .eq('child_name', child)
      .single();

    if (error) {
      // If not found, create a new row
      if (error.code === 'PGRST116') {
        const { data: newData, error: insertError } = await supabase
          .from('startracker_stars')
          .insert([{ child_name: child, filled_stars: [] }])
          .select()
          .single();

        if (insertError) {
          return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        return NextResponse.json(newData);
      }

      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data as StarTrackerRow);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ child: string }> }
) {
  const { child: childParam } = await params;
  const child = childParam.toLowerCase();

  if (!['emerson', 'avery'].includes(child)) {
    return NextResponse.json({ error: 'Invalid child name' }, { status: 400 });
  }

  try {
    const { filled_stars } = await request.json();

    if (!Array.isArray(filled_stars)) {
      return NextResponse.json(
        { error: 'filled_stars must be an array' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('startracker_stars')
      .upsert(
        {
          child_name: child,
          filled_stars,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'child_name' }
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data as StarTrackerRow);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
