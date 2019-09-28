export interface IVariables {
  [key: string]: number | string;
}

export interface IIfThenElse {
  if: string;
  then: IIfThenElse | string;
  else: IIfThenElse | string;
}

function getMessageFromTemplateBase(vars: IVariables, template: IIfThenElse | string): string {
  if (typeof template === 'string') {
    return template;
  }

  let templateIf = template.if;

  Object.keys(vars).forEach((key) => {
    templateIf = templateIf.replace(key, `this.${key}`);
  });

  const ifResult = eval(templateIf);

  if (ifResult) {
    return getMessageFromTemplateBase.call(vars, vars, template.then);
  }

  return getMessageFromTemplateBase.call(vars, vars, template.else);
}

export const getMessageFromTemplate = (vars: IVariables, template: IIfThenElse | string) =>
  getMessageFromTemplateBase.call(vars, vars, template);
