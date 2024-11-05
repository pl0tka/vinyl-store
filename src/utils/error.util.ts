export const ensureErrorInstance = (err: unknown): Error => {
    if (err instanceof Error) {
        return err;
    }

    let stringified = '[Unable to stringify the thrown value]';
    try {
        stringified = JSON.stringify(err);
    } catch {
        throw new Error(stringified);
    }

    const errorMessage = `This value was thrown without being encapsulated in an Error: ${stringified}`;

    return new Error(errorMessage);
};
