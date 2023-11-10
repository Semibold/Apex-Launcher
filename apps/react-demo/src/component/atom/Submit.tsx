interface ISubmitProps {
    submitted: boolean;
    onClick: () => void;
}

/**
 * @desc Pure React Component (Can reuse in other project)
 */
export function Submit({ submitted, onClick }: ISubmitProps) {
    return (
        <p>
            <button onClick={onClick} disabled={submitted}>
                Submit Button (App Level)
            </button>
        </p>
    );
}
