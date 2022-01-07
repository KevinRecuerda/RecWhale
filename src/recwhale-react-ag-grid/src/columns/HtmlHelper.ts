import type {IconDefinition}      from "@fortawesome/fontawesome-common-types";
import {icon}                     from "@fortawesome/fontawesome-svg-core";
import type {ICellRendererParams} from "ag-grid-community";

export type contentType = string | Element | (string | Element | undefined)[];

export class HtmlHelper {
    static button(content: contentType, onClick: () => void): HTMLButtonElement {
        const button     = document.createElement("button");
        button.className = "btn btn-link btn-sm px-1";
        button.onclick   = onClick;
        HtmlHelper.setContent(button, content);
        return button;
    }

    static link(href: string, content: contentType, openNewTab?: boolean): HTMLAnchorElement {
        const a = document.createElement("a");
        a.href  = href;
        if (openNewTab)
            a.target = "_blank";
        HtmlHelper.setContent(a, content);
        return a;
    }

    static span(content: contentType, className?: string): HTMLSpanElement {
        const span     = document.createElement("span");
        span.className = className ?? "";
        HtmlHelper.setContent(span, content);
        return span;
    }

    static input(type: string): HTMLInputElement {
        const input = document.createElement("input");
        input.type  = type;
        return input;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static inputCheckbox(params: ICellRendererParams): HTMLInputElement {
        const input   = HtmlHelper.input("checkbox");
        input.checked = params.value as boolean;
        input.addEventListener("click", () => params.setValue(!params.value));
        return input;
    }

    static icon(iconDef: IconDefinition): SVGElement {
        const renderedIcon = icon(iconDef);
        const element      = renderedIcon.node[0] as SVGElement;
        element.className.baseVal += " mx-1"; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
        return element;
    }

    static setContent(element: HTMLElement, content: contentType): void {
        if (typeof content === "string") {
            element.innerHTML = content;
            return;
        }

        const nodes = HtmlHelper.toNodes(content);
        nodes.forEach(n => element.appendChild(n));
    }

    static toNodes(content: contentType): Node[] {
        const array = Array.build(content);
        return array.mapStrict(x => x!)
            .map(x => typeof x === "string" ? document.createTextNode(x) : x);
    }
}
