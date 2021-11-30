export class EnumHelper {

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static format(value: any): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
        return value?.toString()?.toStartCase() ?? "";
    }
}
