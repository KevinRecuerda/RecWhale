import moment                            from "moment";
import React                             from "react";
import { Form } from "react-bootstrap";
import {ITableKVRowBase, TableKVRowBase} from "./TableKVRowBase";

interface ITableKVRowText extends ITableKVRowBase<moment.Moment> {}

export class TableKVRowDate extends TableKVRowBase<ITableKVRowText> {
    getKey(): string {
        return `${this.props.name}${this.props.required ? "*" : ""}`;
    }
    
    state = {
        value: this.props.value,
    };
    
    render(): React.ReactNode {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        if (!this.props.edit || this.props.readonly)
            return this.renderRead();
        return this.renderEdit();
    }
    
    onChange(date: string): void{
        let newValue = moment(date);
        if (this.props.adaptValue)
            newValue = this.props.adaptValue(newValue);
        if(this.props.onChange)
            this.props.onChange(newValue);
    }
    
    getDefaultValue(): string | undefined {
        return this.state.value ? moment(this.state.value).formatDate() : undefined;
    }

    renderEdit(): React.ReactNode {
        return <Form.Control required={this.props.required} type="date" defaultValue={this.getDefaultValue()} step="any" onChange={(x) => this.onChange(x.target.value)} />;
    }

    renderRead(): React.ReactNode {
        return <Form.Control required={this.props.required} type="date" defaultValue={this.getDefaultValue()} step="any" />;
    }
    
    
}