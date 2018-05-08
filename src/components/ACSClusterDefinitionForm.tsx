import hljs from "highlight.js";
import React from "react";
import Form from "react-jsonschema-form";
import { k8sSchema } from "../shared/ACSEngineModelSchema";
import { Util } from "../shared/Util";
import { IClusterDefinition } from "../types";

interface IACSClusterDefinitionFormJSON {
  clusterDefinition: IClusterDefinition;
}

export const ACSClusterDefinitionFormJSON = (props: IACSClusterDefinitionFormJSON) => {
  const { clusterDefinition } = props;
  const cleaned = Util.removeEmptyObjects(clusterDefinition);

  return (
    <div className="JSON">
      <h3>JSON</h3>
      <pre>
        <code
          contentEditable
          dangerouslySetInnerHTML={{
            __html: hljs.highlight("json", JSON.stringify(cleaned, null, 2)).value,
          }}
        />
      </pre>
    </div>
  );
};

interface IACSClusterDefinitionForm {
  clusterDefinition: IClusterDefinition;
  update: (clusterDefn: IClusterDefinition) => Promise<any>;
}

class ClusterModelForm extends Form<IClusterDefinition> {}
export const ACSClusterDefinitionForm = (props: IACSClusterDefinitionForm) => {
  const { clusterDefinition, update } = props;

  return (
    <div className="ACSClusterDefinitionForm">
      <h3>ACS-Engine API Model</h3>
      <ClusterModelForm
        schema={k8sSchema()}
        formData={clusterDefinition}
        onChange={({ formData }) => {
          const clean = JSON.parse(JSON.stringify(formData));
          update(clean);
        }}
      />
    </div>
  );
};
