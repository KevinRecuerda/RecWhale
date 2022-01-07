import type {FilterChangedEvent, IFloatingFilterComp, IFloatingFilterParams} from "ag-grid-community";

export class FloatingFilterComp implements IFloatingFilterComp {
    params?: IFloatingFilterParams;
    renderer: (params: IFloatingFilterParams) => HTMLElement;
    ui?: HTMLElement;

    constructor(renderer: (params: IFloatingFilterParams) => HTMLElement) {
        this.renderer = renderer;
    }

    static builderSafe(enabled: boolean, renderer: (params: IFloatingFilterParams) => HTMLElement): { new(): IFloatingFilterComp } | undefined {
        return enabled ? this.builder(renderer) : undefined;
    }

    static builder(renderer: (params: IFloatingFilterParams) => HTMLElement): new () => IFloatingFilterComp {
        return class extends FloatingFilterComp {
            constructor() {
                super(renderer);
            }
        };
    }

    init(params: IFloatingFilterParams): void {
        this.params = params;
        this.ui     = this.renderer(params);
    }

    getGui(): HTMLElement {
        return this.ui!;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function,@typescript-eslint/explicit-module-boundary-types
    onParentModelChanged(parentModel: any, filterChangedEvent?: FilterChangedEvent): void { }
}
