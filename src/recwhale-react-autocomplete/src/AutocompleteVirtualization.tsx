/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import ListSubheader                  from "@material-ui/core/ListSubheader";
import {useTheme}                     from "@material-ui/core/styles";
import useMediaQuery                  from "@material-ui/core/useMediaQuery";
import React                          from "react";
import type {ListChildComponentProps} from "react-window";
import {VariableSizeList}             from "react-window";

// VIRTUALIZATION
// https://material-ui.com/components/autocomplete/#virtualization
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const virtualizationProps = () => {
    return {
        ListboxComponent: ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>
    };
};

const LISTBOX_PADDING = 8;

const HEIGHT_XS = 20;
const HEIGHT_SM = 26;
const HEIGHT_MD = 32;

const ITEM_MAX  = 10;
const ITEM_OVER = 5;

function renderRow(props: ListChildComponentProps) {
    const {data, index, style} = props;
    return React.cloneElement(data[index], {
        style: {
            ...style,
            top: (style.top as number) + LISTBOX_PADDING
        }
    });
}

const OuterElementContext    = React.createContext({});
const OuterElementType       = React.forwardRef<HTMLDivElement>((props: any, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});
OuterElementType.displayName = "OuterElementType";

function useResetCache(data: any) {
    const ref = React.useRef<VariableSizeList>(null);
    React.useEffect(() => ref.current?.resetAfterIndex(0, true), [data]);
    return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement>(function ListboxComponent(props: any, ref) {
    const {children, ...innerProps} = props;

    const itemData  = React.Children.toArray(children);
    const itemCount = itemData.length;

    const theme          = useTheme();
    const sm             = useMediaQuery(theme.breakpoints.up("sm"), {noSsr: true});
    const itemSize       = sm ? HEIGHT_SM : HEIGHT_MD;
    const itemSizeHeader = sm ? HEIGHT_XS : HEIGHT_SM;

    const getChildSize = (child: React.ReactNode): number => {
        if (React.isValidElement(child)) {
            switch (child.type) {
                case ListSubheader:
                    return itemSizeHeader;
                case "hr":
                    return 5;
                default:
                    return itemSize;
            }
        }
        return itemSize;
    };

    const getHeight = () => {
        const height = itemCount > ITEM_MAX ? ITEM_MAX * itemSize
            : itemData.sum(item => getChildSize(item));
        return height + 2 * LISTBOX_PADDING;
    };

    const gridRef = useResetCache(itemCount);

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={innerProps}>
                <VariableSizeList
                    ref={gridRef}
                    itemData={itemData}
                    width="100%"
                    height={getHeight()}
                    itemSize={(index: number) => getChildSize(itemData[index])}
                    itemCount={itemCount}
                    overscanCount={ITEM_OVER}
                    outerElementType={OuterElementType}
                    innerElementType="ul">
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

