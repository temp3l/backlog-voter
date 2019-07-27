import * as uriTemplates from "uri-templates";
const log = (type: any) => console.log.bind(console, type);
const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fillTemplate = (ldo: any, valueSet: any) => {
  if (!ldo || !ldo.href) {
    throw new Error("LDO parse error");
  }
  return Object.assign({}, ldo, {
    className: hyperLinksConfig[ldo.rel].className,
    href: uriTemplates(ldo.href).fill(valueSet),
    icon: hyperLinksConfig[ldo.rel].icon
  });
};

const hyperLinksConfig = {
  /*
  self: { icon: "fa fa-default", className: "btn btn-sm btn-outline-default" }, // href /{id}
  parent: {
    icon: "fa fa-default",
    className: "btn btn-sm btn-outline-default"
  }, // href /{id}
  item: { icon: "fa fa-default", className: "btn btn-sm btn-outline-default" }, // href /{id}
  create: {
    icon: "fa fa-default",
    className: "btn btn-sm btn-outline-success"
  }, // method + schema
  update: { icon: "fa fa-default", className: "btn btn-sm btn-outline-info" }, // method /{id}
  delete: { icon: "fa fa-default", className: "btn btn-sm btn-outline-warning" } // method /{id}
  */
};

const returnLinks = (links: any, valueSet: any) => {
  return links.map((ldo: any) => fillTemplate(ldo, valueSet));
};

export { log, timeout, fillTemplate, returnLinks };
