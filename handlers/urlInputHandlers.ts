import * as yup from "yup";

const schema = yup.object().shape({
  originalUrl: yup
    .string()
    .url("URL không hợp lệ")
    .required("Vui lòng nhập chính xác URL"),
});

export default schema;
