webpackJsonp([23],{1275:function(e,t,n){var o=n(5),s=n(76),a=n(555).PageRenderer;a.__esModule&&(a=a.default);var i=s({displayName:"WrappedPageRenderer",getInitialState:function(){return{content:n(1301)}},componentWillMount:function(){},render:function(){return o.createElement(a,Object.assign({},this.props,{content:this.state.content}))}});i.__catalog_loader__=!0,e.exports=i},1301:function(e,t){e.exports="Bootstrap components expect an opinionated CSS reset to be present. In order to not break global styles in an existing app, we provide a customized stylesheet that only applies these styles to elements within a special container element.\n\nWhen using a component from this library, it will be automatically wrapped in an outer container element with the CSS reset styles applied to it. If the component contains other Bootstrap components (e.g. a group of form elements), only the outer-most component will be wrapped.\n\nTo import the stylesheet:\n\n```\nimport '@faithlife/styled-ui/dist/main.css';\n```\n\nMake sure webpack is set up to handle stylesheet imports using `css-loader`, or you will get a syntax error during the build.\n"}});
//# sourceMappingURL=23.88a18ad0.chunk.js.map