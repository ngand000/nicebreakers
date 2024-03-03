/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { Account } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function AccountUpdateForm(props) {
  const {
    id: idProp,
    account: accountModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    userId: "",
    postsLiked: [],
    postsReported: [],
    postDisliked: [],
    Admin: false,
  };
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [postsLiked, setPostsLiked] = React.useState(initialValues.postsLiked);
  const [postsReported, setPostsReported] = React.useState(
    initialValues.postsReported
  );
  const [postDisliked, setPostDisliked] = React.useState(
    initialValues.postDisliked
  );
  const [Admin, setAdmin] = React.useState(initialValues.Admin);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = accountRecord
      ? { ...initialValues, ...accountRecord }
      : initialValues;
    setUserId(cleanValues.userId);
    setPostsLiked(cleanValues.postsLiked ?? []);
    setCurrentPostsLikedValue("");
    setPostsReported(cleanValues.postsReported ?? []);
    setCurrentPostsReportedValue("");
    setPostDisliked(cleanValues.postDisliked ?? []);
    setCurrentPostDislikedValue("");
    setAdmin(cleanValues.Admin);
    setErrors({});
  };
  const [accountRecord, setAccountRecord] = React.useState(accountModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Account, idProp)
        : accountModelProp;
      setAccountRecord(record);
    };
    queryData();
  }, [idProp, accountModelProp]);
  React.useEffect(resetStateValues, [accountRecord]);
  const [currentPostsLikedValue, setCurrentPostsLikedValue] =
    React.useState("");
  const postsLikedRef = React.createRef();
  const [currentPostsReportedValue, setCurrentPostsReportedValue] =
    React.useState("");
  const postsReportedRef = React.createRef();
  const [currentPostDislikedValue, setCurrentPostDislikedValue] =
    React.useState("");
  const postDislikedRef = React.createRef();
  const validations = {
    userId: [{ type: "Required" }],
    postsLiked: [],
    postsReported: [],
    postDisliked: [],
    Admin: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          userId,
          postsLiked,
          postsReported,
          postDisliked,
          Admin,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            Account.copyOf(accountRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "AccountUpdateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={true}
        isReadOnly={false}
        value={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId: value,
              postsLiked,
              postsReported,
              postDisliked,
              Admin,
            };
            const result = onChange(modelFields);
            value = result?.userId ?? value;
          }
          if (errors.userId?.hasError) {
            runValidationTasks("userId", value);
          }
          setUserId(value);
        }}
        onBlur={() => runValidationTasks("userId", userId)}
        errorMessage={errors.userId?.errorMessage}
        hasError={errors.userId?.hasError}
        {...getOverrideProps(overrides, "userId")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              userId,
              postsLiked: values,
              postsReported,
              postDisliked,
              Admin,
            };
            const result = onChange(modelFields);
            values = result?.postsLiked ?? values;
          }
          setPostsLiked(values);
          setCurrentPostsLikedValue("");
        }}
        currentFieldValue={currentPostsLikedValue}
        label={"Posts liked"}
        items={postsLiked}
        hasError={errors?.postsLiked?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("postsLiked", currentPostsLikedValue)
        }
        errorMessage={errors?.postsLiked?.errorMessage}
        setFieldValue={setCurrentPostsLikedValue}
        inputFieldRef={postsLikedRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Posts liked"
          isRequired={false}
          isReadOnly={false}
          value={currentPostsLikedValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.postsLiked?.hasError) {
              runValidationTasks("postsLiked", value);
            }
            setCurrentPostsLikedValue(value);
          }}
          onBlur={() =>
            runValidationTasks("postsLiked", currentPostsLikedValue)
          }
          errorMessage={errors.postsLiked?.errorMessage}
          hasError={errors.postsLiked?.hasError}
          ref={postsLikedRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "postsLiked")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              userId,
              postsLiked,
              postsReported: values,
              postDisliked,
              Admin,
            };
            const result = onChange(modelFields);
            values = result?.postsReported ?? values;
          }
          setPostsReported(values);
          setCurrentPostsReportedValue("");
        }}
        currentFieldValue={currentPostsReportedValue}
        label={"Posts reported"}
        items={postsReported}
        hasError={errors?.postsReported?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("postsReported", currentPostsReportedValue)
        }
        errorMessage={errors?.postsReported?.errorMessage}
        setFieldValue={setCurrentPostsReportedValue}
        inputFieldRef={postsReportedRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Posts reported"
          isRequired={false}
          isReadOnly={false}
          value={currentPostsReportedValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.postsReported?.hasError) {
              runValidationTasks("postsReported", value);
            }
            setCurrentPostsReportedValue(value);
          }}
          onBlur={() =>
            runValidationTasks("postsReported", currentPostsReportedValue)
          }
          errorMessage={errors.postsReported?.errorMessage}
          hasError={errors.postsReported?.hasError}
          ref={postsReportedRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "postsReported")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              userId,
              postsLiked,
              postsReported,
              postDisliked: values,
              Admin,
            };
            const result = onChange(modelFields);
            values = result?.postDisliked ?? values;
          }
          setPostDisliked(values);
          setCurrentPostDislikedValue("");
        }}
        currentFieldValue={currentPostDislikedValue}
        label={"Post disliked"}
        items={postDisliked}
        hasError={errors?.postDisliked?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("postDisliked", currentPostDislikedValue)
        }
        errorMessage={errors?.postDisliked?.errorMessage}
        setFieldValue={setCurrentPostDislikedValue}
        inputFieldRef={postDislikedRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Post disliked"
          isRequired={false}
          isReadOnly={false}
          value={currentPostDislikedValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.postDisliked?.hasError) {
              runValidationTasks("postDisliked", value);
            }
            setCurrentPostDislikedValue(value);
          }}
          onBlur={() =>
            runValidationTasks("postDisliked", currentPostDislikedValue)
          }
          errorMessage={errors.postDisliked?.errorMessage}
          hasError={errors.postDisliked?.hasError}
          ref={postDislikedRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "postDisliked")}
        ></TextField>
      </ArrayField>
      <SwitchField
        label="Admin"
        defaultChecked={false}
        isDisabled={false}
        isChecked={Admin}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              userId,
              postsLiked,
              postsReported,
              postDisliked,
              Admin: value,
            };
            const result = onChange(modelFields);
            value = result?.Admin ?? value;
          }
          if (errors.Admin?.hasError) {
            runValidationTasks("Admin", value);
          }
          setAdmin(value);
        }}
        onBlur={() => runValidationTasks("Admin", Admin)}
        errorMessage={errors.Admin?.errorMessage}
        hasError={errors.Admin?.hasError}
        {...getOverrideProps(overrides, "Admin")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || accountModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || accountModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
