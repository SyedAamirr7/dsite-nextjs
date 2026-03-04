'use client';

interface LanguageSwitcherProps {
  label: string;
  title: string;
  onToggle: () => void;
}

export default function LanguageSwitcher({
  label,
  title,
  onToggle,
}: LanguageSwitcherProps) {
  return (
    <button
      type="button"
      className="btn btn-light language-switcher"
      title={title}
      onClick={onToggle}
      aria-label={title}
    >
      {label}
    </button>
  );
}
