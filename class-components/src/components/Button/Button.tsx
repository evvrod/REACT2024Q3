import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  className?: string; // eslint-disable-line react/require-default-props
  onClick?: () => void; // eslint-disable-line react/require-default-props
  disabled?: boolean; // eslint-disable-line react/require-default-props
  type?: 'button' | 'submit'; // eslint-disable-line react/require-default-props
}

export default function Button({
  children,
  className = '',
  onClick = () => {},
  disabled = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type === 'button' ? 'button' : 'submit'}
    >
      {children}
    </button>
  );
}
