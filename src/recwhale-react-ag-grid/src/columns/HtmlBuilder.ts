import type {ICellRendererParams} from "ag-grid-community";
import {IconType}                 from "react-icons";

export type contentType = string | Element | (string | Element | undefined)[];

export class HtmlBuilder {
    static button(content: contentType, onClick: () => void): HTMLButtonElement {
        const button     = document.createElement("button");
        button.className = "btn btn-link btn-sm px-1";
        button.onclick   = onClick;
        HtmlBuilder.setContent(button, content);
        return button;
    }

    static link(href: string, content: contentType, openNewTab?: boolean): HTMLAnchorElement {
        const a = document.createElement("a");
        a.href  = href;
        if (openNewTab)
            a.target = "_blank";
        HtmlBuilder.setContent(a, content);
        return a;
    }

    static span(content: contentType, className?: string): HTMLSpanElement {
        const span     = document.createElement("span");
        span.className = className ?? "";
        HtmlBuilder.setContent(span, content);
        return span;
    }

    static input(type: string): HTMLInputElement {
        const input = document.createElement("input");
        input.type  = type;
        return input;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static inputCheckbox(params: ICellRendererParams): HTMLInputElement {
        const input   = HtmlBuilder.input("checkbox");
        input.checked = params.value as boolean;
        input.addEventListener("click", () => params.setValue(!params.value));
        return input;
    }

    static icon(iconType: IconType): string {
        console.log(iconType);
        const svgPath = "";//iconType().props.children[0].props.d
        // const renderedIcon = icon(iconType);
        // const element      = renderedIcon.node[0] as SVGElement;
        // element.className.baseVal += " mx-1"; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="${svgPath}"></path></svg>`;;
    }

    static setContent(element: HTMLElement, content: contentType): void {
        if (typeof content === "string") {
            element.innerHTML = content;
            return;
        }

        const nodes = HtmlBuilder.toNodes(content);
        nodes.forEach(n => element.appendChild(n));
    }

    static toNodes(content: contentType): Node[] {
        const array = Array.build(content);
        return array.mapStrict(x => x!)
            .map(x => typeof x === "string" ? document.createTextNode(x) : x);
    }
}
