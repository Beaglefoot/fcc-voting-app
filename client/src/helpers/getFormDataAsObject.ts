const getFormDataAsObject = (form: HTMLFormElement) =>
  Array.from(new FormData(form).entries()).reduce(
    (obj, [key, value]) => Object.assign(obj, { [key]: value }),
    {}
  );

export default getFormDataAsObject;
