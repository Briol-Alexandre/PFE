import { getRepairStatusInFrench, getRepairStatusColor, getRepairProgress, repairStatusOrder } from '@/Utils/repairStatus';

export default function ProgressBar({ status }) {
    const progress = getRepairProgress(status);
    const currentColor = getRepairStatusColor(status);

    return (
        <div className="w-full space-y-2">
            <span className="text-sm font-medium text-brand">
                {getRepairStatusInFrench(status)}
            </span>

            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full transition-all duration-500 ease-in-out"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: currentColor
                    }}
                />
            </div>
        </div>
    );
}
