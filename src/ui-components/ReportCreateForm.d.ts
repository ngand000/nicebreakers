/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ReportCreateFormInputValues = {
    reason?: string;
    postId?: string;
};
export declare type ReportCreateFormValidationValues = {
    reason?: ValidationFunction<string>;
    postId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReportCreateFormOverridesProps = {
    ReportCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    reason?: PrimitiveOverrideProps<TextFieldProps>;
    postId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ReportCreateFormProps = React.PropsWithChildren<{
    overrides?: ReportCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ReportCreateFormInputValues) => ReportCreateFormInputValues;
    onSuccess?: (fields: ReportCreateFormInputValues) => void;
    onError?: (fields: ReportCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReportCreateFormInputValues) => ReportCreateFormInputValues;
    onValidate?: ReportCreateFormValidationValues;
} & React.CSSProperties>;
export default function ReportCreateForm(props: ReportCreateFormProps): React.ReactElement;
