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
export declare type QuestionCreateFormInputValues = {
    question?: string;
    likes?: number;
    ageRange?: number[];
    endorsed?: boolean;
    tags?: string[];
    author?: string;
    timesReported?: number;
};
export declare type QuestionCreateFormValidationValues = {
    question?: ValidationFunction<string>;
    likes?: ValidationFunction<number>;
    ageRange?: ValidationFunction<number>;
    endorsed?: ValidationFunction<boolean>;
    tags?: ValidationFunction<string>;
    author?: ValidationFunction<string>;
    timesReported?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type QuestionCreateFormOverridesProps = {
    QuestionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    question?: PrimitiveOverrideProps<TextFieldProps>;
    likes?: PrimitiveOverrideProps<TextFieldProps>;
    ageRange?: PrimitiveOverrideProps<TextFieldProps>;
    endorsed?: PrimitiveOverrideProps<SwitchFieldProps>;
    tags?: PrimitiveOverrideProps<TextFieldProps>;
    author?: PrimitiveOverrideProps<TextFieldProps>;
    timesReported?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type QuestionCreateFormProps = React.PropsWithChildren<{
    overrides?: QuestionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: QuestionCreateFormInputValues) => QuestionCreateFormInputValues;
    onSuccess?: (fields: QuestionCreateFormInputValues) => void;
    onError?: (fields: QuestionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: QuestionCreateFormInputValues) => QuestionCreateFormInputValues;
    onValidate?: QuestionCreateFormValidationValues;
} & React.CSSProperties>;
export default function QuestionCreateForm(props: QuestionCreateFormProps): React.ReactElement;
