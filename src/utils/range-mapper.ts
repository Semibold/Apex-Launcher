export function rangeMapper(
    source: { range: [number, number]; value: number },
    target: { range: [number, number]; clamp?: boolean } = { range: [0, 1], clamp: false },
): number {
    if (source.range[0] > source.range[1]) source.range = [source.range[1], source.range[0]];
    if (target.range[0] > target.range[1]) target.range = [target.range[1], target.range[0]];
    const sourceDiff = source.range[1] - source.range[0];
    const targetDiff = target.range[1] - target.range[0];
    const ratio = (source.value - source.range[0]) / sourceDiff;
    const targetValue = targetDiff * ratio + target.range[0];
    if (target.clamp) {
        if (targetValue < target.range[0]) return target.range[0];
        if (targetValue > target.range[1]) return target.range[1];
    }
    return targetValue;
}
