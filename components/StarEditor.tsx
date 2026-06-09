'use client';

interface StarEditorProps {
  starNumber: number;
  dateCode: number;
  note: string;
  accentColor: string;
  onChangeDate: (code: number) => void;
  onChangeNote: (note: string) => void;
  onRemove: () => void;
  onClose: () => void;
}

function pad(value: number) {
  return String(value).padStart(2, '0');
}

// filled_stars stores a date as MM*100 + DD (no year). Convert to/from the
// YYYY-MM-DD value an <input type="date"> expects, using the current year.
function codeToDateInput(code: number) {
  const now = new Date();
  const month = Math.floor(code / 100);
  const day = code % 100;

  if (code <= 0 || month < 1 || month > 12 || day < 1 || day > 31) {
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  }

  return `${now.getFullYear()}-${pad(month)}-${pad(day)}`;
}

function dateInputToCode(value: string) {
  const [, month, day] = value.split('-').map(Number);
  if (!month || !day) return 0;
  return month * 100 + day;
}

export function StarEditor({
  starNumber,
  dateCode,
  note,
  accentColor,
  onChangeDate,
  onChangeNote,
  onRemove,
  onClose,
}: StarEditorProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 320,
          background: '#161616',
          border: `3px solid ${accentColor}`,
          borderRadius: 10,
          boxShadow: `0 0 24px ${accentColor}55`,
          padding: 18,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 11,
            color: accentColor,
            letterSpacing: 1,
            textAlign: 'center',
          }}
        >
          ★ STAR {starNumber} ★
        </div>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 7,
              color: '#888',
              letterSpacing: 1,
            }}
          >
            DATE
          </span>
          <input
            type="date"
            value={codeToDateInput(dateCode)}
            onChange={(event) => onChangeDate(dateInputToCode(event.target.value))}
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 10,
              padding: '8px 10px',
              background: '#0d0d0d',
              color: '#fff',
              border: '2px solid #333',
              borderRadius: 6,
              colorScheme: 'dark',
            }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 7,
              color: '#888',
              letterSpacing: 1,
            }}
          >
            WHAT YOU DID
          </span>
          <textarea
            value={note}
            onChange={(event) => onChangeNote(event.target.value)}
            placeholder="e.g. cleaned up toys"
            rows={3}
            autoFocus
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 14,
              padding: '8px 10px',
              background: '#0d0d0d',
              color: '#fff',
              border: '2px solid #333',
              borderRadius: 6,
              resize: 'vertical',
            }}
          />
        </label>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
          <button
            onClick={onRemove}
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 7,
              background: '#2a1010',
              color: '#cc6666',
              border: '2px solid #553333',
              padding: '8px 12px',
              cursor: 'pointer',
            }}
          >
            REMOVE
          </button>
          <button
            onClick={onClose}
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 7,
              background: accentColor,
              color: '#0d0d0d',
              border: 'none',
              padding: '8px 18px',
              cursor: 'pointer',
            }}
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
}
