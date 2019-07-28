import uriTemplates from "uri-templates";
const log = (type: any) => console.log.bind(console, type);
const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fillTemplate = (ldo: any, valueSet: any) => {
  if (!ldo || !ldo.href) {
    console.log("LDO parse error");
  }
  return Object.assign({}, ldo, {
    className: hyperLinksConfig[ldo.rel].className,
    href: uriTemplates(ldo.href).fill(valueSet),
    icon: hyperLinksConfig[ldo.rel].icon
  });
};

const hyperLinksConfig = {
  create: {
    className: "btn btn-sm btn-outline-success",
    icon: "fa fa-default"
  },
  delete: {
    className: "btn btn-sm btn-outline-warning",
    icon: "fa fa-default",
  },
  item: { icon: "fa fa-default", className: "btn btn-sm btn-outline-default" }, // href /{id}
  parent: {
    className: "btn btn-sm btn-outline-default",
    icon: "fa fa-default"
  },
  self: { icon: "fa fa-default", className: "btn btn-sm btn-outline-default" }, // href /{id}
  update: { icon: "fa fa-default", className: "btn btn-sm btn-outline-info" } // method /{id}
};

const returnLinks = (links: any, valueSet: any) => {
  return links.map((ldo: any) => fillTemplate(ldo, valueSet));
};

export { log, timeout, fillTemplate, returnLinks };
