interface SidebarStepperControlProps {
  label: string
  valueText: string
  onDecrease: () => void
  onIncrease: () => void
  isDecreaseDisabled: boolean
  isIncreaseDisabled: boolean
}

export function SidebarStepperControl({
  label,
  valueText,
  onDecrease,
  onIncrease,
  isDecreaseDisabled,
  isIncreaseDisabled,
}: SidebarStepperControlProps) {
  return (
    <div className="stepper-row">
      <p className="stepper-row__label">{label}</p>
      <div className="stepper-row__controls">
        <button
          type="button"
          className="stepper-row__btn"
          onClick={onDecrease}
          disabled={isDecreaseDisabled}
          aria-label={`${label} diminuisci`}
        >
          -
        </button>
        <p className="stepper-row__value">{valueText}</p>
        <button
          type="button"
          className="stepper-row__btn"
          onClick={onIncrease}
          disabled={isIncreaseDisabled}
          aria-label={`${label} aumenta`}
        >
          +
        </button>
      </div>
    </div>
  )
}
