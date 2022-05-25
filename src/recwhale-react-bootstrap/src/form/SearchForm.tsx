import React, {PropsWithChildren, ReactElement, useEffect, useMemo, useState} from "react";
import {Button}                                                               from "react-bootstrap";
import {FaAngleDoubleDown, FaAngleDoubleUp}                                   from "react-icons/fa";
import {ReactHelper}                                                          from "recwhale-react-core";
import {ButtonIcon}                                                           from "../button";

type ISearchForm = React.FC<ISearchFormProps> & {
    Advanced: typeof SearchFormAdvanced;
    Tooltip: typeof SearchFormTooltip;
};

interface ISearchFormProps {
    search: () => Promise<void>;
    canSearch: boolean;
    onLoading?: (isLoading: boolean) => void;
    inline?: boolean;
    label?: string;
    className?: string;
}

export const SearchForm: ISearchForm = (props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => props.onLoading?.(isLoading), [isLoading]);

    const disabled = useMemo(() => !props.canSearch || isLoading, [props.canSearch, isLoading]);

    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

    const [advanced, tooltip, basics]
              = useMemo(() => {
                            const advanced = ReactHelper.getChildrenOfType(props, SearchFormAdvanced.name)
                                                        .cast<ReactElement<PropsWithChildren<unknown>>>()
                                                        .firstOrDefault();
                            const tooltip  = ReactHelper.getChildrenOfType(props, SearchFormTooltip.name)
                                                        .cast<ReactElement<PropsWithChildren<unknown>>>()
                                                        .firstOrDefault();
                            const basics   = ReactHelper.getChildren(props).except(advanced, tooltip);

                            return [advanced?.props.children, tooltip?.props.children, basics];
                        },
                        [props.children]);

    async function search() {
        if (!props.canSearch)
            return;

        setIsLoading(true);
        try {
            await props.search();
        } finally {
            setIsLoading(false);
        } 
    }

    let classes = "d-flex align-items-center c-mr-3";
    if (props.inline)
        classes += " form-inline";

    return (<>
        <div className={`search-form border-bottom mb-2 px-3 py-2 c-mt-2 ${props.className}`}>
            <div className={classes}>
                {advanced && <ButtonIcon icon={FaAngleDoubleDown} size="sm" variant="light-secondary"
                                         title="show advanced filters" run={() => setShowAdvanced(true)}
                                         className={showAdvanced ? "invisible" : ""}/>
                }
                {basics}

                <div className={`ml-auto ${classes}`}>
                    {tooltip}
                    <Button variant="primary" className="ml-auto" disabled={disabled} onClick={search}>{props.label ?? "search"}</Button>
                </div>
            </div>
            {advanced && showAdvanced && (
                <div className={classes}>
                    <ButtonIcon icon={FaAngleDoubleUp} size="sm" variant="light-secondary"
                                title="hide advanced filters" run={() => setShowAdvanced(false)}/>
                    {advanced}
                </div>
            )}
        </div>
    </>);
};

const SearchFormAdvanced: React.FC = (props) => <>{props.children}</>;
const SearchFormTooltip: React.FC  = (props) => <>{props.children}</>;

SearchForm.Advanced = SearchFormAdvanced;
SearchForm.Tooltip  = SearchFormTooltip;

