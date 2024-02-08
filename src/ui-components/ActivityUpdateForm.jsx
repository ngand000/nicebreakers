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
import { Activity } from "../models";
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
export default function ActivityUpdateForm(props) {
  const {
    id: idProp,
    activity: activityModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    description: "",
    author: "",
    abstract: "",
    likes: "",
    pictures: [],
    captions: [],
    playerCount: [],
    duration: [],
    ageRange: [],
    endorsed: false,
    setup: "",
    tags: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [author, setAuthor] = React.useState(initialValues.author);
  const [abstract, setAbstract] = React.useState(initialValues.abstract);
  const [likes, setLikes] = React.useState(initialValues.likes);
  const [pictures, setPictures] = React.useState(initialValues.pictures);
  const [captions, setCaptions] = React.useState(initialValues.captions);
  const [playerCount, setPlayerCount] = React.useState(
    initialValues.playerCount
  );
  const [duration, setDuration] = React.useState(initialValues.duration);
  const [ageRange, setAgeRange] = React.useState(initialValues.ageRange);
  const [endorsed, setEndorsed] = React.useState(initialValues.endorsed);
  const [setup, setSetup] = React.useState(initialValues.setup);
  const [tags, setTags] = React.useState(initialValues.tags);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = activityRecord
      ? { ...initialValues, ...activityRecord }
      : initialValues;
    setName(cleanValues.name);
    setDescription(cleanValues.description);
    setAuthor(cleanValues.author);
    setAbstract(cleanValues.abstract);
    setLikes(cleanValues.likes);
    setPictures(cleanValues.pictures ?? []);
    setCurrentPicturesValue("");
    setCaptions(cleanValues.captions ?? []);
    setCurrentCaptionsValue("");
    setPlayerCount(cleanValues.playerCount ?? []);
    setCurrentPlayerCountValue("");
    setDuration(cleanValues.duration ?? []);
    setCurrentDurationValue("");
    setAgeRange(cleanValues.ageRange ?? []);
    setCurrentAgeRangeValue("");
    setEndorsed(cleanValues.endorsed);
    setSetup(cleanValues.setup);
    setTags(cleanValues.tags ?? []);
    setCurrentTagsValue("");
    setErrors({});
  };
  const [activityRecord, setActivityRecord] = React.useState(activityModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Activity, idProp)
        : activityModelProp;
      setActivityRecord(record);
    };
    queryData();
  }, [idProp, activityModelProp]);
  React.useEffect(resetStateValues, [activityRecord]);
  const [currentPicturesValue, setCurrentPicturesValue] = React.useState("");
  const picturesRef = React.createRef();
  const [currentCaptionsValue, setCurrentCaptionsValue] = React.useState("");
  const captionsRef = React.createRef();
  const [currentPlayerCountValue, setCurrentPlayerCountValue] =
    React.useState("");
  const playerCountRef = React.createRef();
  const [currentDurationValue, setCurrentDurationValue] = React.useState("");
  const durationRef = React.createRef();
  const [currentAgeRangeValue, setCurrentAgeRangeValue] = React.useState("");
  const ageRangeRef = React.createRef();
  const [currentTagsValue, setCurrentTagsValue] = React.useState("");
  const tagsRef = React.createRef();
  const validations = {
    name: [{ type: "Required" }],
    description: [{ type: "Required" }],
    author: [{ type: "Required" }],
    abstract: [],
    likes: [{ type: "Required" }],
    pictures: [],
    captions: [],
    playerCount: [{ type: "Required" }],
    duration: [{ type: "Required" }],
    ageRange: [{ type: "Required" }],
    endorsed: [],
    setup: [{ type: "Required" }],
    tags: [],
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
          name,
          description,
          author,
          abstract,
          likes,
          pictures,
          captions,
          playerCount,
          duration,
          ageRange,
          endorsed,
          setup,
          tags,
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
            Activity.copyOf(activityRecord, (updated) => {
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
      {...getOverrideProps(overrides, "ActivityUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              description,
              author,
              abstract,
              likes,
              pictures,
              captions,
              playerCount,
              duration,
              ageRange,
              endorsed,
              setup,
              tags,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description: value,
              author,
              abstract,
              likes,
              pictures,
              captions,
              playerCount,
              duration,
              ageRange,
              endorsed,
              setup,
              tags,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Author"
        isRequired={true}
        isReadOnly={false}
        value={author}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              author: value,
              abstract,
              likes,
              pictures,
              captions,
              playerCount,
              duration,
              ageRange,
              endorsed,
              setup,
              tags,
            };
            const result = onChange(modelFields);
            value = result?.author ?? value;
          }
          if (errors.author?.hasError) {
            runValidationTasks("author", value);
          }
          setAuthor(value);
        }}
        onBlur={() => runValidationTasks("author", author)}
        errorMessage={errors.author?.errorMessage}
        hasError={errors.author?.hasError}
        {...getOverrideProps(overrides, "author")}
      ></TextField>
      <TextField
        label="Abstract"
        isRequired={false}
        isReadOnly={false}
        value={abstract}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              author,
              abstract: value,
              likes,
              pictures,
              captions,
              playerCount,
              duration,
              ageRange,
              endorsed,
              setup,
              tags,
            };
            const result = onChange(modelFields);
            value = result?.abstract ?? value;
          }
          if (errors.abstract?.hasError) {
            runValidationTasks("abstract", value);
          }
          setAbstract(value);
        }}
        onBlur={() => runValidationTasks("abstract", abstract)}
        errorMessage={errors.abstract?.errorMessage}
        hasError={errors.abstract?.hasError}
        {...getOverrideProps(overrides, "abstract")}
      ></TextField>
      <TextField
        label="Likes"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={likes}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              author,
              abstract,
              likes: value,
              pictures,
              captions,
              playerCount,
              duration,
              ageRange,
              endorsed,
              setup,
              tags,
            };
            const result = onChange(modelFields);
            value = result?.likes ?? value;
          }
          if (errors.likes?.hasError) {
            runValidationTasks("likes", value);
          }
          setLikes(value);
        }}
        onBlur={() => runValidationTasks("likes", likes)}
        errorMessage={errors.likes?.errorMessage}
        hasError={errors.likes?.hasError}
        {...getOverrideProps(overrides, "likes")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              author,
              abstract,
              likes,
              pictures: values,
              captions,
              playerCount,
              duration,
              ageRange,
              endorsed,
              setup,
              tags,
            };
            const result = onChange(modelFields);
            values = result?.pictures ?? values;
          }
          setPictures(values);
          setCurrentPicturesValue("");
        }}
        currentFieldValue={currentPicturesValue}
        label={"Pictures"}
        items={pictures}
        hasError={errors?.pictures?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("pictures", currentPicturesValue)
        }
        errorMessage={errors?.pictures?.errorMessage}
        setFieldValue={setCurrentPicturesValue}
        inputFieldRef={picturesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Pictures"
          isRequired={false}
          isReadOnly={false}
          value={currentPicturesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.pictures?.hasError) {
              runValidationTasks("pictures", value);
            }
            setCurrentPicturesValue(value);
          }}
          onBlur={() => runValidationTasks("pictures", currentPicturesValue)}
          errorMessage={errors.pictures?.errorMessage}
          hasError={errors.pictures?.hasError}
          ref={picturesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "pictures")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              author,
              abstract,
              likes,
              pictures,
              captions: values,
              playerCount,
              duration,
              ageRange,
              endorsed,
              setup,
              tags,
            };
            const result = onChange(modelFields);
            values = result?.captions ?? values;
          }
          setCaptions(values);
          setCurrentCaptionsValue("");
        }}
        currentFieldValue={currentCaptionsValue}
        label={"Captions"}
        items={captions}
        hasError={errors?.captions?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("captions", currentCaptionsValue)
        }
        errorMessage={errors?.captions?.errorMessage}
        setFieldValue={setCurrentCaptionsValue}
        inputFieldRef={captionsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Captions"
          isRequired={false}
          isReadOnly={false}
          value={currentCaptionsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.captions?.hasError) {
              runValidationTasks("captions", value);
            }
            setCurrentCaptionsValue(value);
          }}
          onBlur={() => runValidationTasks("captions", currentCaptionsValue)}
          errorMessage={errors.captions?.errorMessage}
          hasError={errors.captions?.hasError}
          ref={captionsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "captions")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              author,
              abstract,
              likes,
              pictures,
              captions,
              playerCount: values,
              duration,
              ageRange,
              endorsed,
              setup,
              tags,
            };
            const result = onChange(modelFields);
            values = result?.playerCount ?? values;
          }
          setPlayerCount(values);
          setCurrentPlayerCountValue("");
        }}
        currentFieldValue={currentPlayerCountValue}
        label={"Player count"}
        items={playerCount}
        hasError={errors?.playerCount?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("playerCount", currentPlayerCountValue)
        }
        errorMessage={errors?.playerCount?.errorMessage}
        setFieldValue={setCurrentPlayerCountValue}
        inputFieldRef={playerCountRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Player count"
          isRequired={true}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentPlayerCountValue}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.playerCount?.hasError) {
              runValidationTasks("playerCount", value);
            }
            setCurrentPlayerCountValue(value);
          }}
          onBlur={() =>
            runValidationTasks("playerCount", currentPlayerCountValue)
          }
          errorMessage={errors.playerCount?.errorMessage}
          hasError={errors.playerCount?.hasError}
          ref={playerCountRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "playerCount")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              author,
              abstract,
              likes,
              pictures,
              captions,
              playerCount,
              duration: values,
              ageRange,
              endorsed,
              setup,
              tags,
            };
            const result = onChange(modelFields);
            values = result?.duration ?? values;
          }
          setDuration(values);
          setCurrentDurationValue("");
        }}
        currentFieldValue={currentDurationValue}
        label={"Duration"}
        items={duration}
        hasError={errors?.duration?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("duration", currentDurationValue)
        }
        errorMessage={errors?.duration?.errorMessage}
        setFieldValue={setCurrentDurationValue}
        inputFieldRef={durationRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Duration"
          isRequired={true}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentDurationValue}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.duration?.hasError) {
              runValidationTasks("duration", value);
            }
            setCurrentDurationValue(value);
          }}
          onBlur={() => runValidationTasks("duration", currentDurationValue)}
          errorMessage={errors.duration?.errorMessage}
          hasError={errors.duration?.hasError}
          ref={durationRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "duration")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              author,
              abstract,
              likes,
              pictures,
              captions,
              playerCount,
              duration,
              ageRange: values,
              endorsed,
              setup,
              tags,
            };
            const result = onChange(modelFields);
            values = result?.ageRange ?? values;
          }
          setAgeRange(values);
          setCurrentAgeRangeValue("");
        }}
        currentFieldValue={currentAgeRangeValue}
        label={"Age range"}
        items={ageRange}
        hasError={errors?.ageRange?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("ageRange", currentAgeRangeValue)
        }
        errorMessage={errors?.ageRange?.errorMessage}
        setFieldValue={setCurrentAgeRangeValue}
        inputFieldRef={ageRangeRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Age range"
          isRequired={true}
          isReadOnly={false}
          type="number"
          step="any"
          value={currentAgeRangeValue}
          onChange={(e) => {
            let value = isNaN(parseInt(e.target.value))
              ? e.target.value
              : parseInt(e.target.value);
            if (errors.ageRange?.hasError) {
              runValidationTasks("ageRange", value);
            }
            setCurrentAgeRangeValue(value);
          }}
          onBlur={() => runValidationTasks("ageRange", currentAgeRangeValue)}
          errorMessage={errors.ageRange?.errorMessage}
          hasError={errors.ageRange?.hasError}
          ref={ageRangeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "ageRange")}
        ></TextField>
      </ArrayField>
      <SwitchField
        label="Endorsed"
        defaultChecked={false}
        isDisabled={false}
        isChecked={endorsed}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              description,
              author,
              abstract,
              likes,
              pictures,
              captions,
              playerCount,
              duration,
              ageRange,
              endorsed: value,
              setup,
              tags,
            };
            const result = onChange(modelFields);
            value = result?.endorsed ?? value;
          }
          if (errors.endorsed?.hasError) {
            runValidationTasks("endorsed", value);
          }
          setEndorsed(value);
        }}
        onBlur={() => runValidationTasks("endorsed", endorsed)}
        errorMessage={errors.endorsed?.errorMessage}
        hasError={errors.endorsed?.hasError}
        {...getOverrideProps(overrides, "endorsed")}
      ></SwitchField>
      <TextField
        label="Setup"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={setup}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              author,
              abstract,
              likes,
              pictures,
              captions,
              playerCount,
              duration,
              ageRange,
              endorsed,
              setup: value,
              tags,
            };
            const result = onChange(modelFields);
            value = result?.setup ?? value;
          }
          if (errors.setup?.hasError) {
            runValidationTasks("setup", value);
          }
          setSetup(value);
        }}
        onBlur={() => runValidationTasks("setup", setup)}
        errorMessage={errors.setup?.errorMessage}
        hasError={errors.setup?.hasError}
        {...getOverrideProps(overrides, "setup")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              author,
              abstract,
              likes,
              pictures,
              captions,
              playerCount,
              duration,
              ageRange,
              endorsed,
              setup,
              tags: values,
            };
            const result = onChange(modelFields);
            values = result?.tags ?? values;
          }
          setTags(values);
          setCurrentTagsValue("");
        }}
        currentFieldValue={currentTagsValue}
        label={"Tags"}
        items={tags}
        hasError={errors?.tags?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("tags", currentTagsValue)
        }
        errorMessage={errors?.tags?.errorMessage}
        setFieldValue={setCurrentTagsValue}
        inputFieldRef={tagsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Tags"
          isRequired={false}
          isReadOnly={false}
          value={currentTagsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.tags?.hasError) {
              runValidationTasks("tags", value);
            }
            setCurrentTagsValue(value);
          }}
          onBlur={() => runValidationTasks("tags", currentTagsValue)}
          errorMessage={errors.tags?.errorMessage}
          hasError={errors.tags?.hasError}
          ref={tagsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "tags")}
        ></TextField>
      </ArrayField>
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
          isDisabled={!(idProp || activityModelProp)}
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
              !(idProp || activityModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
