import React                             from "react";
import {Form}                            from "react-bootstrap";
import {Unit}                            from "recwhale-ts";
import {ITableKVRowBase, TableKVRowBase} from "./TableKVRowBase";

interface ITableKVRowText extends ITableKVRowBase<number> {
    unit?: Unit,
    fractionDigits?: number,
}

export class TableKVRowNumber extends TableKVRowBase<ITableKVRowText> {
    state = {
        value: this.props.value,
    };

    getKey(): string {
        return `${this.props.name}${this.props.required ? "*" : ""}`;
    }
    
    render(): React.ReactNode {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        if (!this.props.edit || this.props.readonly)
            return this.renderRead();
        return this.renderEdit();
    }

    onChange(date: string): void{
        let newValue = Number(date);
        if (this.props.adaptValue)
            newValue = this.props.adaptValue(newValue);
        if (this.props.onChange)
            this.props.onChange(newValue);
    }
    
    getValue(): string | undefined {
        return this.state.value ? Number(this.state.value).format(this.props.unit, this.props.fractionDigits) : undefined;
    }

    renderEdit(): React.ReactNode {
        return <Form.Control value={this.getValue()} required={this.props.required} type="number" defaultValue={this.getValue()} step="any" onChange={(x) => this.onChange(x.target.value)} />;
    }

    renderRead(): React.ReactNode {
        return <Form.Control value={this.getValue()} required={this.props.required} type="number" defaultValue={this.getValue()} step="any" readOnly={true} />;
    }
}