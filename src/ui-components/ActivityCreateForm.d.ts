/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ActivityCreateFormInputValues = {
    name?: string;
    description?: string;
    author?: string;
    abstract?: string;
    likes?: number;
    pictures?: string[];
    captions?: string[];
    playerCount?: number[];
    duration?: number[];
    ageRange?: number[];
    endorsed?: boolean;
    setup?: number;
    tags?: string[];
};
export declare type ActivityCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    author?: ValidationFunction<string>;
    abstract?: ValidationFunction<string>;
    likes?: ValidationFunction<number>;
    pictures?: ValidationFunction<string>;
    captions?: ValidationFunction<string>;
    playerCount?: ValidationFunction<number>;
    duration?: ValidationFunction<number>;
    ageRange?: ValidationFunction<number>;
    endorsed?: ValidationFunction<boolean>;
    setup?: ValidationFunction<number>;
    tags?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ActivityCreateFormOverridesProps = {
    ActivityCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    author?: PrimitiveOverrideProps<TextFieldProps>;
    abstract?: PrimitiveOverrideProps<TextFieldProps>;
    likes?: PrimitiveOverrideProps<TextFieldProps>;
    pictures?: PrimitiveOverrideProps<TextFieldProps>;
    captions?: PrimitiveOverrideProps<TextFieldProps>;
    playerCount?: PrimitiveOverrideProps<TextFieldProps>;
    duration?: PrimitiveOverrideProps<TextFieldProps>;
    ageRange?: PrimitiveOverrideProps<TextFieldProps>;
    endorsed?: PrimitiveOverrideProps<SwitchFieldProps>;
    setup?: PrimitiveOverrideProps<TextFieldProps>;
    tags?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ActivityCreateFormProps = React.PropsWithChildren<{
    overrides?: ActivityCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ActivityCreateFormInputValues) => ActivityCreateFormInputValues;
    onSuccess?: (fields: ActivityCreateFormInputValues) => void;
    onError?: (fields: ActivityCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ActivityCreateFormInputValues) => ActivityCreateFormInputValues;
    onValidate?: ActivityCreateFormValidationValues;
} & React.CSSProperties>;
export default function ActivityCreateForm(props: ActivityCreateFormProps): React.ReactElement;
