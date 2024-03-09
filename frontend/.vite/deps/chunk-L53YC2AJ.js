import {
  chakra,
  cx,
  forwardRef,
  require_jsx_runtime,
  useStyleConfig
} from "./chunk-ZMIRXJC7.js";
import {
  require_react
} from "./chunk-UM3JHGVO.js";
import {
  __toESM
} from "./chunk-CEQRFMJQ.js";

// node_modules/@chakra-ui/icon/dist/chunk-2GBDXOMA.mjs
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var fallbackIcon = {
  path: (0, import_jsx_runtime.jsxs)("g", { stroke: "currentColor", strokeWidth: "1.5", children: [
    (0, import_jsx_runtime.jsx)(
      "path",
      {
        strokeLinecap: "round",
        fill: "none",
        d: "M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
      }
    ),
    (0, import_jsx_runtime.jsx)(
      "path",
      {
        fill: "currentColor",
        strokeLinecap: "round",
        d: "M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
      }
    ),
    (0, import_jsx_runtime.jsx)("circle", { fill: "none", strokeMiterlimit: "10", cx: "12", cy: "12", r: "11.25" })
  ] }),
  viewBox: "0 0 24 24"
};
var Icon = forwardRef((props, ref) => {
  const {
    as: element,
    viewBox,
    color = "currentColor",
    focusable = false,
    children,
    className,
    __css,
    ...rest
  } = props;
  const _className = cx("chakra-icon", className);
  const customStyles = useStyleConfig("Icon", props);
  const styles = {
    w: "1em",
    h: "1em",
    display: "inline-block",
    lineHeight: "1em",
    flexShrink: 0,
    color,
    ...__css,
    ...customStyles
  };
  const shared = {
    ref,
    focusable,
    className: _className,
    __css: styles
  };
  const _viewBox = viewBox != null ? viewBox : fallbackIcon.viewBox;
  if (element && typeof element !== "string") {
    return (0, import_jsx_runtime.jsx)(chakra.svg, { as: element, ...shared, ...rest });
  }
  const _path = children != null ? children : fallbackIcon.path;
  return (0, import_jsx_runtime.jsx)(chakra.svg, { verticalAlign: "middle", viewBox: _viewBox, ...shared, ...rest, children: _path });
});
Icon.displayName = "Icon";

// node_modules/@chakra-ui/icon/dist/chunk-DEQZ7DVA.mjs
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function createIcon(options) {
  const {
    viewBox = "0 0 24 24",
    d: pathDefinition,
    displayName,
    defaultProps = {}
  } = options;
  const path = import_react.Children.toArray(options.path);
  const Comp = forwardRef((props, ref) => (0, import_jsx_runtime2.jsx)(Icon, { ref, viewBox, ...defaultProps, ...props, children: path.length ? path : (0, import_jsx_runtime2.jsx)("path", { fill: "currentColor", d: pathDefinition }) }));
  Comp.displayName = displayName;
  return Comp;
}

export {
  Icon,
  createIcon
};
//# sourceMappingURL=chunk-L53YC2AJ.js.map
