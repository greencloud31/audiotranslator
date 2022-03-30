import React, { useState } from "react";
import { toast } from "react-toastify";
import { convert } from "../services/convertService";
import ListError from "./listError";
import Joi from "joi";

const Convert = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("Select Language");

  const schema = Joi.object({
    text: Joi.string().required().label("Text"),
    language: Joi.string().required().label("Language"),
  });

  const validate = () => {
    const result = schema.validate({ text, language }, { abortEarly: false });

    if (!result.error) {
      return null;
    }
    const errors = {};
    for (let item of result.error.details) {
      toast.error(item.message);
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (errors) {
      return;
    }

    try {
      await convert(text, language);
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        toast.error(<ListError errors={Object.values(ex.response.data)} />);
      }
    }
  };

  return (
    <div className="card" onSubmit={handleSubmit}>
      <form>
        <div className="form-group">
          <label htmlFor="language" className="label">
            Choose Language
          </label>
          <select
            className="form-control"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.currentTarget.value)}
          >
            <option value="hi">Hindi</option>
            <option value="fr-CA">French (Canada) </option>
            <option value="te">Telugu</option>
            <option value="mr">Marathi</option>
            <option value="kn">Kannada</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="textlanguage" className="label">
            Enter Text
          </label>
          <textarea
            className="form-control"
            placeholder="Text"
            id="textlanguage"
            value={text}
            rows="3"
            onChange={(e) => setText(e.currentTarget.value)}
          ></textarea>
        </div>
        <button className="btn btn-primary">Convert</button>
      </form>
    </div>
  );
};

export default Convert;
