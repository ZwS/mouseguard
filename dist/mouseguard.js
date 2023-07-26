var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// module/actor.js
var MouseGuardActor = class extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();
  }
  prepareData() {
    super.prepareData();
    this._prepareCharacterData(this);
  }
  _prepareCharacterData(actorData) {
    this.system.itemTypes = this.itemTypes;
  }
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);
    const abilities = [];
    let create_ability;
    if ((data.type === "character" || data.type === "mouse") && this.itemTypes.ability.length <= 0) {
      create_ability = [
        "MOUSEGUARD.MNature",
        "MOUSEGUARD.Will",
        "MOUSEGUARD.Health",
        "MOUSEGUARD.Resources",
        "MOUSEGUARD.Circles"
      ];
    } else if (data.type === "weasel" && this.itemTypes.ability.length <= 0) {
      create_ability = [
        "MOUSEGUARD.WNature",
        "MOUSEGUARD.Will",
        "MOUSEGUARD.Health",
        "MOUSEGUARD.Resources",
        "MOUSEGUARD.Circles"
      ];
    } else if (data.type === "animal" && this.itemTypes.ability.length <= 0) {
      create_ability = [
        game.i18n.localize("MOUSEGUARD.Nature") + " (" + data.name + ")"
      ];
    }
    if (Object(create_ability).length > 0) {
      for (let i of create_ability) {
        abilities.push({
          name: i,
          type: "ability"
        });
      }
      this.updateSource({
        items: abilities,
        img: "systems/mouseguard/assets/icons/seated-mouse.svg"
      });
    }
  }
};

// module/item.js
var MouseGuardItem = class extends Item {
  prepareDerivedData() {
    super.prepareDerivedData();
    this.system.groups = this.system.groups || {};
    this.system.attributes = this.system.attributes || {};
  }
};

// module/item-sheet.js
var MouseGuardItemSheet = class extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["mouseguard", "sheet", "item"],
      template: "systems/mouseguard/templates/item-sheet.html",
      width: 520,
      height: 480,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ],
      scrollY: [".attributes"]
    });
  }
  getData() {
    const context = super.getData();
    context.systemData = context.item.system;
    return context;
  }
  async activateListeners(html) {
    super.activateListeners(html);
  }
};

// node_modules/svelte/internal/index.mjs
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var src_url_equal_anchor;
function src_url_equal(element_src, url) {
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement("a");
  }
  src_url_equal_anchor.href = url;
  return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
var tasks = new Set();
var is_hydrating = false;
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function append(target, node) {
  target.appendChild(node);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function svg_element(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_style(node, key, value, important) {
  if (value === null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
var crossorigin;
function is_crossorigin() {
  if (crossorigin === void 0) {
    crossorigin = false;
    try {
      if (typeof window !== "undefined" && window.parent) {
        void window.parent.document;
      }
    } catch (error) {
      crossorigin = true;
    }
  }
  return crossorigin;
}
function add_resize_listener(node, fn) {
  const computed_style = getComputedStyle(node);
  if (computed_style.position === "static") {
    node.style.position = "relative";
  }
  const iframe = element("iframe");
  iframe.setAttribute("style", "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;");
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;
  const crossorigin2 = is_crossorigin();
  let unsubscribe;
  if (crossorigin2) {
    iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>";
    unsubscribe = listen(window, "message", (event) => {
      if (event.source === iframe.contentWindow)
        fn();
    });
  } else {
    iframe.src = "about:blank";
    iframe.onload = () => {
      unsubscribe = listen(iframe.contentWindow, "resize", fn);
    };
  }
  append(node, iframe);
  return () => {
    if (crossorigin2) {
      unsubscribe();
    } else if (unsubscribe && iframe.contentWindow) {
      unsubscribe();
    }
    detach(iframe);
  };
}
var HtmlTag = class {
  constructor(is_svg = false) {
    this.is_svg = false;
    this.is_svg = is_svg;
    this.e = this.n = null;
  }
  c(html) {
    this.h(html);
  }
  m(html, target, anchor = null) {
    if (!this.e) {
      if (this.is_svg)
        this.e = svg_element(target.nodeName);
      else
        this.e = element(target.nodeName);
      this.t = target;
      this.c(html);
    }
    this.i(anchor);
  }
  h(html) {
    this.e.innerHTML = html;
    this.n = Array.from(this.e.childNodes);
  }
  i(anchor) {
    for (let i = 0; i < this.n.length; i += 1) {
      insert(this.t, this.n[i], anchor);
    }
  }
  p(html) {
    this.d();
    this.h(html);
    this.i(this.a);
  }
  d() {
    this.n.forEach(detach);
  }
};
function construct_svelte_component(component, props) {
  return new component(props);
}
var managed_styles = new Map();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
var seen_callbacks = new Set();
var flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
var outroing = new Set();
var outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance12, create_fragment12, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance12 ? instance12(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment12 ? create_fragment12($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const { on_mount } = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr2, _oldValue, newValue) {
      this[attr2] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}
var SvelteComponent = class {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
};

// module/svelte/MouseGuardEditor.svelte
function create_if_block(ctx) {
  let a;
  let mounted;
  let dispose;
  return {
    c() {
      a = element("a");
      a.innerHTML = `<i class="fas fa-edit"></i>`;
      attr(a, "class", "editor-edit");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if (!mounted) {
        dispose = listen(a, "click", prevent_default(ctx[6]));
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(a);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment(ctx) {
  let div1;
  let span;
  let t0;
  let div0;
  let div0_resize_listener;
  let t1;
  let if_block = ctx[1].editable && create_if_block(ctx);
  return {
    c() {
      div1 = element("div");
      span = element("span");
      t0 = space();
      div0 = element("div");
      t1 = space();
      if (if_block)
        if_block.c();
      attr(div0, "class", "editor-content svelte-1ccthvk");
      attr(div0, "data-edit", ctx[0]);
      add_render_callback(() => ctx[9].call(div0));
      attr(div1, "class", "editor svelte-1ccthvk");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, span);
      append(div1, t0);
      append(div1, div0);
      div0.innerHTML = ctx[4];
      ctx[8](div0);
      div0_resize_listener = add_resize_listener(div0, ctx[9].bind(div0));
      append(div1, t1);
      if (if_block)
        if_block.m(div1, null);
    },
    p(ctx2, [dirty]) {
      if (dirty & 16)
        div0.innerHTML = ctx2[4];
      ;
      if (dirty & 1) {
        attr(div0, "data-edit", ctx2[0]);
      }
      if (ctx2[1].editable) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          if_block.m(div1, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div1);
      ctx[8](null);
      div0_resize_listener();
      if (if_block)
        if_block.d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let $sheetData;
  let { target } = $$props;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(1, $sheetData = value));
  let data;
  const TextEditor = globalThis.TextEditor;
  let editorContent;
  let height;
  let mce;
  let rawContent = getProperty($sheetData?.data, target) ?? "";
  let content = TextEditor.enrichHTML(rawContent, {
    secrets: $sheetData.isOwner,
    async: false
  });
  let editor = {};
  onDestroy(async () => {
    if (mce)
      mce.destroy();
  });
  const createEditor = async () => {
    TextEditor.create({
      target: editorContent,
      invalid_elements: "iframe",
      save_onsavecallback: async (m) => {
        mce = m;
        const isDirty = mce.getContent() !== editor.initial;
        mce.remove();
        if (isDirty) {
          await $sheetData.sheet._onSubmit(new Event("submit"));
        }
        mce.destroy();
      }
    }).then((m) => {
      editor.m = m;
      mce = m;
      editor.changed = false;
      editor.active = true;
      mce.focus();
      mce.on("change", (ev) => editor.changed = true);
    });
  };
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      editorContent = $$value;
      $$invalidate(2, editorContent);
    });
  }
  function div0_elementresize_handler() {
    height = this.clientHeight;
    $$invalidate(3, height);
  }
  $$self.$$set = ($$props2) => {
    if ("target" in $$props2)
      $$invalidate(0, target = $$props2.target);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 2) {
      $:
        data = $sheetData.data;
    }
    if ($$self.$$.dirty & 131) {
      $: {
        $$invalidate(7, rawContent = getProperty($sheetData?.data, target));
        $$invalidate(4, content = TextEditor.enrichHTML(rawContent, {
          secrets: $sheetData.isOwner,
          async: false
        }));
      }
    }
  };
  return [
    target,
    $sheetData,
    editorContent,
    height,
    content,
    sheetData,
    createEditor,
    rawContent,
    div0_binding,
    div0_elementresize_handler
  ];
}
var MouseGuardEditor = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { target: 0 });
  }
};
var MouseGuardEditor_default = MouseGuardEditor;

// module/svelte/MouseGuardActorSheetMouseDetails.svelte
function create_else_block(ctx) {
  let html_tag;
  let raw_value = ctx[1].system.biography + "";
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag(false);
      html_anchor = empty();
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(raw_value, target, anchor);
      insert(target, html_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && raw_value !== (raw_value = ctx2[1].system.biography + ""))
        html_tag.p(raw_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(html_anchor);
      if (detaching)
        html_tag.d();
    }
  };
}
function create_if_block2(ctx) {
  let div0;
  let label0;
  let t1;
  let label1;
  let raw0_value = game.i18n.localize("MOUSEGUARD.BeliefSub") + "";
  let t2;
  let textarea0;
  let textarea0_value_value;
  let t3;
  let div1;
  let label2;
  let t5;
  let label3;
  let raw1_value = game.i18n.localize("MOUSEGUARD.InstinctSub") + "";
  let t6;
  let textarea1;
  let textarea1_value_value;
  let t7;
  let div2;
  let label4;
  let t9;
  let label5;
  let raw2_value = game.i18n.localize("MOUSEGUARD.GoalSub") + "";
  let t10;
  let textarea2;
  let textarea2_value_value;
  let t11;
  let mouseguardeditor;
  let current;
  mouseguardeditor = new MouseGuardEditor_default({ props: { target: "system.biography" } });
  return {
    c() {
      div0 = element("div");
      label0 = element("label");
      label0.textContent = `${game.i18n.localize("MOUSEGUARD.Belief")}`;
      t1 = space();
      label1 = element("label");
      t2 = space();
      textarea0 = element("textarea");
      t3 = space();
      div1 = element("div");
      label2 = element("label");
      label2.textContent = `${game.i18n.localize("MOUSEGUARD.Instinct")}`;
      t5 = space();
      label3 = element("label");
      t6 = space();
      textarea1 = element("textarea");
      t7 = space();
      div2 = element("div");
      label4 = element("label");
      label4.textContent = `${game.i18n.localize("MOUSEGUARD.Goal")}`;
      t9 = space();
      label5 = element("label");
      t10 = space();
      textarea2 = element("textarea");
      t11 = space();
      create_component(mouseguardeditor.$$.fragment);
      attr(label0, "class", "svelte-6c3beh");
      attr(label1, "class", "sub svelte-6c3beh");
      attr(textarea0, "name", "system.rewards.belief");
      textarea0.value = textarea0_value_value = ctx[1].system.rewards.belief;
      attr(textarea0, "class", "svelte-6c3beh");
      attr(div0, "class", "reward");
      attr(label2, "class", "svelte-6c3beh");
      attr(label3, "class", "sub svelte-6c3beh");
      attr(textarea1, "name", "system.rewards.instinct");
      textarea1.value = textarea1_value_value = ctx[1].system.rewards.instinct;
      attr(textarea1, "class", "svelte-6c3beh");
      attr(div1, "class", "reward");
      attr(label4, "class", "svelte-6c3beh");
      attr(label5, "class", "sub svelte-6c3beh");
      attr(textarea2, "name", "system.rewards.goal");
      textarea2.value = textarea2_value_value = ctx[1].system.rewards.goal;
      attr(textarea2, "class", "svelte-6c3beh");
      attr(div2, "class", "reward");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, label0);
      append(div0, t1);
      append(div0, label1);
      label1.innerHTML = raw0_value;
      append(div0, t2);
      append(div0, textarea0);
      insert(target, t3, anchor);
      insert(target, div1, anchor);
      append(div1, label2);
      append(div1, t5);
      append(div1, label3);
      label3.innerHTML = raw1_value;
      append(div1, t6);
      append(div1, textarea1);
      insert(target, t7, anchor);
      insert(target, div2, anchor);
      append(div2, label4);
      append(div2, t9);
      append(div2, label5);
      label5.innerHTML = raw2_value;
      append(div2, t10);
      append(div2, textarea2);
      insert(target, t11, anchor);
      mount_component(mouseguardeditor, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty & 2 && textarea0_value_value !== (textarea0_value_value = ctx2[1].system.rewards.belief)) {
        textarea0.value = textarea0_value_value;
      }
      if (!current || dirty & 2 && textarea1_value_value !== (textarea1_value_value = ctx2[1].system.rewards.instinct)) {
        textarea1.value = textarea1_value_value;
      }
      if (!current || dirty & 2 && textarea2_value_value !== (textarea2_value_value = ctx2[1].system.rewards.goal)) {
        textarea2.value = textarea2_value_value;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(mouseguardeditor.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(mouseguardeditor.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(div1);
      if (detaching)
        detach(t7);
      if (detaching)
        detach(div2);
      if (detaching)
        detach(t11);
      destroy_component(mouseguardeditor, detaching);
    }
  };
}
function create_fragment2(ctx) {
  let div0;
  let label0;
  let t2;
  let input0;
  let input0_value_value;
  let t3;
  let label1;
  let t6;
  let input1;
  let input1_value_value;
  let t7;
  let label2;
  let t10;
  let input2;
  let input2_value_value;
  let t11;
  let label3;
  let t14;
  let input3;
  let input3_value_value;
  let t15;
  let label4;
  let t18;
  let input4;
  let input4_value_value;
  let t19;
  let label5;
  let t22;
  let input5;
  let input5_value_value;
  let t23;
  let label6;
  let t26;
  let input6;
  let input6_value_value;
  let t27;
  let label7;
  let t30;
  let input7;
  let input7_value_value;
  let t31;
  let label8;
  let t34;
  let input8;
  let input8_value_value;
  let t35;
  let label9;
  let t38;
  let input9;
  let input9_value_value;
  let t39;
  let div1;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block2, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (!ctx2[0])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      div0 = element("div");
      label0 = element("label");
      label0.textContent = `${game.i18n.localize("MOUSEGUARD.Age")}:`;
      t2 = space();
      input0 = element("input");
      t3 = space();
      label1 = element("label");
      label1.textContent = `${game.i18n.localize("MOUSEGUARD.Home")}:`;
      t6 = space();
      input1 = element("input");
      t7 = space();
      label2 = element("label");
      label2.textContent = `${game.i18n.localize("MOUSEGUARD.Fur")}:`;
      t10 = space();
      input2 = element("input");
      t11 = space();
      label3 = element("label");
      label3.textContent = `${game.i18n.localize("MOUSEGUARD.Cloak")}:`;
      t14 = space();
      input3 = element("input");
      t15 = space();
      label4 = element("label");
      label4.textContent = `${game.i18n.localize("MOUSEGUARD.GuardRank")}:`;
      t18 = space();
      input4 = element("input");
      t19 = space();
      label5 = element("label");
      label5.textContent = `${game.i18n.localize("MOUSEGUARD.Parents")}:`;
      t22 = space();
      input5 = element("input");
      t23 = space();
      label6 = element("label");
      label6.textContent = `${game.i18n.localize("MOUSEGUARD.Senior")}:`;
      t26 = space();
      input6 = element("input");
      t27 = space();
      label7 = element("label");
      label7.textContent = `${game.i18n.localize("MOUSEGUARD.Mentor")}:`;
      t30 = space();
      input7 = element("input");
      t31 = space();
      label8 = element("label");
      label8.textContent = `${game.i18n.localize("MOUSEGUARD.Friend")}:`;
      t34 = space();
      input8 = element("input");
      t35 = space();
      label9 = element("label");
      label9.textContent = `${game.i18n.localize("MOUSEGUARD.Enemy")}:`;
      t38 = space();
      input9 = element("input");
      t39 = space();
      div1 = element("div");
      if_block.c();
      attr(label0, "class", "svelte-6c3beh");
      attr(input0, "name", "system.details.age");
      input0.disabled = ctx[0];
      attr(input0, "type", "text");
      input0.value = input0_value_value = ctx[1].system.details.age;
      attr(input0, "class", "svelte-6c3beh");
      attr(label1, "class", "svelte-6c3beh");
      attr(input1, "name", "system.details.home");
      input1.disabled = ctx[0];
      attr(input1, "type", "text");
      input1.value = input1_value_value = ctx[1].system.details.home;
      attr(input1, "class", "svelte-6c3beh");
      attr(label2, "class", "svelte-6c3beh");
      attr(input2, "name", "system.details.fur_color");
      input2.disabled = ctx[0];
      attr(input2, "type", "text");
      input2.value = input2_value_value = ctx[1].system.details.fur_color;
      attr(input2, "class", "svelte-6c3beh");
      attr(label3, "class", "svelte-6c3beh");
      attr(input3, "name", "system.details.cloak_color");
      input3.disabled = ctx[0];
      attr(input3, "type", "text");
      input3.value = input3_value_value = ctx[1].system.details.cloak_color;
      attr(input3, "class", "svelte-6c3beh");
      attr(label4, "class", "svelte-6c3beh");
      attr(input4, "name", "system.details.guard_rank");
      input4.disabled = ctx[0];
      attr(input4, "type", "text");
      input4.value = input4_value_value = ctx[1].system.details.guard_rank;
      attr(input4, "class", "svelte-6c3beh");
      attr(label5, "class", "svelte-6c3beh");
      attr(input5, "name", "system.details.parents");
      input5.disabled = ctx[0];
      attr(input5, "type", "text");
      input5.value = input5_value_value = ctx[1].system.details.parents;
      attr(input5, "class", "svelte-6c3beh");
      attr(label6, "class", "svelte-6c3beh");
      attr(input6, "name", "system.details.senior_artisan");
      input6.disabled = ctx[0];
      attr(input6, "type", "text");
      input6.value = input6_value_value = ctx[1].system.details.senior_artisan;
      attr(input6, "class", "svelte-6c3beh");
      attr(label7, "class", "svelte-6c3beh");
      attr(input7, "name", "system.details.mentor");
      input7.disabled = ctx[0];
      attr(input7, "type", "text");
      input7.value = input7_value_value = ctx[1].system.details.mentor;
      attr(input7, "class", "svelte-6c3beh");
      attr(label8, "class", "svelte-6c3beh");
      attr(input8, "name", "system.details.friend");
      input8.disabled = ctx[0];
      attr(input8, "type", "text");
      input8.value = input8_value_value = ctx[1].system.details.friend;
      attr(input8, "class", "svelte-6c3beh");
      attr(label9, "class", "svelte-6c3beh");
      attr(input9, "name", "system.details.enemy");
      input9.disabled = ctx[0];
      attr(input9, "type", "text");
      input9.value = input9_value_value = ctx[1].system.details.enemy;
      attr(input9, "class", "svelte-6c3beh");
      attr(div0, "class", "characteristics flexcol svelte-6c3beh");
      attr(div1, "class", "biography flexcol");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, label0);
      append(div0, t2);
      append(div0, input0);
      append(div0, t3);
      append(div0, label1);
      append(div0, t6);
      append(div0, input1);
      append(div0, t7);
      append(div0, label2);
      append(div0, t10);
      append(div0, input2);
      append(div0, t11);
      append(div0, label3);
      append(div0, t14);
      append(div0, input3);
      append(div0, t15);
      append(div0, label4);
      append(div0, t18);
      append(div0, input4);
      append(div0, t19);
      append(div0, label5);
      append(div0, t22);
      append(div0, input5);
      append(div0, t23);
      append(div0, label6);
      append(div0, t26);
      append(div0, input6);
      append(div0, t27);
      append(div0, label7);
      append(div0, t30);
      append(div0, input7);
      append(div0, t31);
      append(div0, label8);
      append(div0, t34);
      append(div0, input8);
      append(div0, t35);
      append(div0, label9);
      append(div0, t38);
      append(div0, input9);
      insert(target, t39, anchor);
      insert(target, div1, anchor);
      if_blocks[current_block_type_index].m(div1, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!current || dirty & 1) {
        input0.disabled = ctx2[0];
      }
      if (!current || dirty & 2 && input0_value_value !== (input0_value_value = ctx2[1].system.details.age) && input0.value !== input0_value_value) {
        input0.value = input0_value_value;
      }
      if (!current || dirty & 1) {
        input1.disabled = ctx2[0];
      }
      if (!current || dirty & 2 && input1_value_value !== (input1_value_value = ctx2[1].system.details.home) && input1.value !== input1_value_value) {
        input1.value = input1_value_value;
      }
      if (!current || dirty & 1) {
        input2.disabled = ctx2[0];
      }
      if (!current || dirty & 2 && input2_value_value !== (input2_value_value = ctx2[1].system.details.fur_color) && input2.value !== input2_value_value) {
        input2.value = input2_value_value;
      }
      if (!current || dirty & 1) {
        input3.disabled = ctx2[0];
      }
      if (!current || dirty & 2 && input3_value_value !== (input3_value_value = ctx2[1].system.details.cloak_color) && input3.value !== input3_value_value) {
        input3.value = input3_value_value;
      }
      if (!current || dirty & 1) {
        input4.disabled = ctx2[0];
      }
      if (!current || dirty & 2 && input4_value_value !== (input4_value_value = ctx2[1].system.details.guard_rank) && input4.value !== input4_value_value) {
        input4.value = input4_value_value;
      }
      if (!current || dirty & 1) {
        input5.disabled = ctx2[0];
      }
      if (!current || dirty & 2 && input5_value_value !== (input5_value_value = ctx2[1].system.details.parents) && input5.value !== input5_value_value) {
        input5.value = input5_value_value;
      }
      if (!current || dirty & 1) {
        input6.disabled = ctx2[0];
      }
      if (!current || dirty & 2 && input6_value_value !== (input6_value_value = ctx2[1].system.details.senior_artisan) && input6.value !== input6_value_value) {
        input6.value = input6_value_value;
      }
      if (!current || dirty & 1) {
        input7.disabled = ctx2[0];
      }
      if (!current || dirty & 2 && input7_value_value !== (input7_value_value = ctx2[1].system.details.mentor) && input7.value !== input7_value_value) {
        input7.value = input7_value_value;
      }
      if (!current || dirty & 1) {
        input8.disabled = ctx2[0];
      }
      if (!current || dirty & 2 && input8_value_value !== (input8_value_value = ctx2[1].system.details.friend) && input8.value !== input8_value_value) {
        input8.value = input8_value_value;
      }
      if (!current || dirty & 1) {
        input9.disabled = ctx2[0];
      }
      if (!current || dirty & 2 && input9_value_value !== (input9_value_value = ctx2[1].system.details.enemy) && input9.value !== input9_value_value) {
        input9.value = input9_value_value;
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div1, null);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t39);
      if (detaching)
        detach(div1);
      if_blocks[current_block_type_index].d();
    }
  };
}
function instance2($$self, $$props, $$invalidate) {
  let $sheetData;
  let { limited } = $$props;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(3, $sheetData = value));
  let data;
  $$self.$$set = ($$props2) => {
    if ("limited" in $$props2)
      $$invalidate(0, limited = $$props2.limited);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 8) {
      $:
        $$invalidate(1, data = $sheetData.data);
    }
  };
  return [limited, data, sheetData, $sheetData];
}
var MouseGuardActorSheetMouseDetails = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance2, create_fragment2, safe_not_equal, { limited: 0 });
  }
};
var MouseGuardActorSheetMouseDetails_default = MouseGuardActorSheetMouseDetails;

// module/svelte/MouseGuardActorSheetMouseRewards.svelte
function create_fragment3(ctx) {
  let div0;
  let label0;
  let t1;
  let input0;
  let input0_value_value;
  let t2;
  let div1;
  let label1;
  let t4;
  let input1;
  let input1_value_value;
  let t5;
  let div2;
  let label2;
  let t7;
  let input2;
  let input2_value_value;
  return {
    c() {
      div0 = element("div");
      label0 = element("label");
      label0.textContent = `${game.i18n.localize("MOUSEGUARD.Fate")}`;
      t1 = space();
      input0 = element("input");
      t2 = space();
      div1 = element("div");
      label1 = element("label");
      label1.textContent = `${game.i18n.localize("MOUSEGUARD.Persona")}`;
      t4 = space();
      input1 = element("input");
      t5 = space();
      div2 = element("div");
      label2 = element("label");
      label2.textContent = `${game.i18n.localize("MOUSEGUARD.Checks")}`;
      t7 = space();
      input2 = element("input");
      attr(label0, "class", "header svelte-1ebpjqs");
      attr(input0, "class", "fatebox svelte-1ebpjqs");
      attr(input0, "name", "system.rewards.fate");
      attr(input0, "type", "number");
      input0.value = input0_value_value = ctx[0].system.rewards.fate;
      attr(input0, "placeholder", "0");
      attr(div0, "class", "form-group svelte-1ebpjqs");
      attr(label1, "class", "header svelte-1ebpjqs");
      attr(input1, "class", "personabox svelte-1ebpjqs");
      attr(input1, "name", "system.rewards.persona");
      attr(input1, "type", "number");
      input1.value = input1_value_value = ctx[0].system.rewards.persona;
      attr(input1, "placeholder", "0");
      attr(div1, "class", "form-group svelte-1ebpjqs");
      attr(label2, "class", "header svelte-1ebpjqs");
      attr(input2, "class", "checksbox svelte-1ebpjqs");
      attr(input2, "name", "system.rewards.check");
      attr(input2, "type", "number");
      input2.value = input2_value_value = ctx[0].system.rewards.check;
      attr(input2, "placeholder", "0");
      attr(div2, "class", "form-group svelte-1ebpjqs");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, label0);
      append(div0, t1);
      append(div0, input0);
      insert(target, t2, anchor);
      insert(target, div1, anchor);
      append(div1, label1);
      append(div1, t4);
      append(div1, input1);
      insert(target, t5, anchor);
      insert(target, div2, anchor);
      append(div2, label2);
      append(div2, t7);
      append(div2, input2);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1 && input0_value_value !== (input0_value_value = ctx2[0].system.rewards.fate) && input0.value !== input0_value_value) {
        input0.value = input0_value_value;
      }
      if (dirty & 1 && input1_value_value !== (input1_value_value = ctx2[0].system.rewards.persona) && input1.value !== input1_value_value) {
        input1.value = input1_value_value;
      }
      if (dirty & 1 && input2_value_value !== (input2_value_value = ctx2[0].system.rewards.check) && input2.value !== input2_value_value) {
        input2.value = input2_value_value;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(div1);
      if (detaching)
        detach(t5);
      if (detaching)
        detach(div2);
    }
  };
}
function instance3($$self, $$props, $$invalidate) {
  let $sheetData;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(2, $sheetData = value));
  let data;
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 4) {
      $:
        $$invalidate(0, data = $sheetData.data);
    }
  };
  return [data, sheetData, $sheetData];
}
var MouseGuardActorSheetMouseRewards = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance3, create_fragment3, safe_not_equal, {});
  }
};
var MouseGuardActorSheetMouseRewards_default = MouseGuardActorSheetMouseRewards;

// module/svelte/MouseGuardCommon.svelte
function updateRating(sheet, item2, type, value) {
  const ob = { [type]: value };
  if (type == "rank" || type == "rating" || type == "level") {
    if (value < 1)
      ob[type] = 1;
    ob.fail = 0;
    ob.pass = 0;
  }
  sheet?._updateEmbededItem(item2, ob);
}
function setMouseDice(sheet, count, message = "") {
  sheet?._setMouseDice(count, message);
}

// module/svelte/MouseGuardActorSheetItemList.svelte
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[18] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[21] = list[i];
  child_ctx[23] = i;
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[21] = list[i];
  child_ctx[23] = i;
  return child_ctx;
}
function get_each_context_3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[21] = list[i];
  child_ctx[23] = i;
  return child_ctx;
}
function get_each_context_4(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[21] = list[i];
  child_ctx[23] = i;
  return child_ctx;
}
function create_if_block_7(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = `${ctx[6].ratingPropertyName}`;
      attr(div, "class", "item-detail item-rank svelte-1u8k5nf");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_6(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = `${game.i18n.localize("MOUSEGUARD.Advancement")}`;
      attr(div, "class", "item-detail item-advancement svelte-1u8k5nf");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_5(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = `${game.i18n.localize("MOUSEGUARD.Uses")}`;
      attr(div, "class", "item-detail item-uses svelte-1u8k5nf");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_4(ctx) {
  let div;
  let input;
  let input_name_value;
  let input_max_value;
  let input_value_value;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      input = element("input");
      attr(input, "name", input_name_value = ctx[18].id);
      attr(input, "type", "number");
      attr(input, "min", "1");
      attr(input, "max", input_max_value = ctx[6].maxRating);
      input.value = input_value_value = ctx[18].system[ctx[6].ratingProperty];
      attr(input, "class", "svelte-1u8k5nf");
      attr(div, "class", "item-detail item-rank flexrow svelte-1u8k5nf");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, input);
      if (!mounted) {
        dispose = listen(input, "change", ctx[11]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & 8 && input_name_value !== (input_name_value = ctx2[18].id)) {
        attr(input, "name", input_name_value);
      }
      if (dirty & 8 && input_value_value !== (input_value_value = ctx2[18].system[ctx2[6].ratingProperty]) && input.value !== input_value_value) {
        input.value = input_value_value;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_3(ctx) {
  let div;
  let pass;
  let span0;
  let t0_value = game.i18n.localize("MOUSEGUARD.PassesAbbr") + "";
  let t0;
  let t1;
  let span0_data_tooltip_value;
  let t2;
  let fail;
  let span1;
  let t3_value = game.i18n.localize("MOUSEGUARD.FailsAbbr") + "";
  let t3;
  let t4;
  let span1_data_tooltip_value;
  let each_value_4 = {
    length: parseInt(ctx[18].system[ctx[6].ratingProperty]) + 1
  };
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_4.length; i += 1) {
    each_blocks_1[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
  }
  let each_value_3 = {
    length: parseInt(ctx[18].system[ctx[6].ratingProperty])
  };
  let each_blocks = [];
  for (let i = 0; i < each_value_3.length; i += 1) {
    each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
  }
  return {
    c() {
      div = element("div");
      pass = element("pass");
      span0 = element("span");
      t0 = text(t0_value);
      t1 = text(":\n                            ");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t2 = space();
      fail = element("fail");
      span1 = element("span");
      t3 = text(t3_value);
      t4 = text(":\n\n                            ");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(span0, "data-tooltip", span0_data_tooltip_value = game.i18n.localize("MOUSEGUARD.Passes"));
      attr(pass, "class", "svelte-1u8k5nf");
      attr(span1, "data-tooltip", span1_data_tooltip_value = game.i18n.localize("MOUSEGUARD.Fails"));
      attr(fail, "class", "svelte-1u8k5nf");
      attr(div, "class", "item-detail item-advancement svelte-1u8k5nf");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, pass);
      append(pass, span0);
      append(span0, t0);
      append(span0, t1);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].m(span0, null);
      }
      append(div, t2);
      append(div, fail);
      append(fail, span1);
      append(span1, t3);
      append(span1, t4);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(span1, null);
      }
    },
    p(ctx2, dirty) {
      if (dirty & 168) {
        each_value_4 = {
          length: parseInt(ctx2[18].system[ctx2[6].ratingProperty]) + 1
        };
        let i;
        for (i = 0; i < each_value_4.length; i += 1) {
          const child_ctx = get_each_context_4(ctx2, each_value_4, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
          } else {
            each_blocks_1[i] = create_each_block_4(child_ctx);
            each_blocks_1[i].c();
            each_blocks_1[i].m(span0, null);
          }
        }
        for (; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].d(1);
        }
        each_blocks_1.length = each_value_4.length;
      }
      if (dirty & 168) {
        each_value_3 = {
          length: parseInt(ctx2[18].system[ctx2[6].ratingProperty])
        };
        let i;
        for (i = 0; i < each_value_3.length; i += 1) {
          const child_ctx = get_each_context_3(ctx2, each_value_3, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_3(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(span1, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_3.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block_4(ctx) {
  let i_1;
  let i_1_class_value;
  let mounted;
  let dispose;
  function click_handler_2(...args) {
    return ctx[12](ctx[18], ctx[23], ...args);
  }
  return {
    c() {
      i_1 = element("i");
      attr(i_1, "class", i_1_class_value = "far " + (ctx[7](ctx[18].system.pass, ctx[23]) < 0 ? "fa-circle-check" : "fa-circle"));
    },
    m(target, anchor) {
      insert(target, i_1, anchor);
      if (!mounted) {
        dispose = listen(i_1, "click", click_handler_2);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 8 && i_1_class_value !== (i_1_class_value = "far " + (ctx[7](ctx[18].system.pass, ctx[23]) < 0 ? "fa-circle-check" : "fa-circle"))) {
        attr(i_1, "class", i_1_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(i_1);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_3(ctx) {
  let i_1;
  let i_1_class_value;
  let mounted;
  let dispose;
  function click_handler_3(...args) {
    return ctx[13](ctx[18], ctx[23], ...args);
  }
  return {
    c() {
      i_1 = element("i");
      attr(i_1, "class", i_1_class_value = "far " + (ctx[7](ctx[18].system.fail, ctx[23]) < 0 ? "fa-circle-check" : "fa-circle"));
    },
    m(target, anchor) {
      insert(target, i_1, anchor);
      if (!mounted) {
        dispose = listen(i_1, "click", click_handler_3);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 8 && i_1_class_value !== (i_1_class_value = "far " + (ctx[7](ctx[18].system.fail, ctx[23]) < 0 ? "fa-circle-check" : "fa-circle"))) {
        attr(i_1, "class", i_1_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(i_1);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_1(ctx) {
  let div;
  let for_1;
  let span0;
  let t0_value = game.i18n.localize("MOUSEGUARD.UsedForAbbr") + "";
  let t0;
  let t1;
  let span0_data_tooltip_value;
  let t2;
  let against;
  let span1;
  let t3_value = game.i18n.localize("MOUSEGUARD.UsedAgainstAbbr") + "";
  let t3;
  let t4;
  let span1_data_tooltip_value;
  function select_block_type(ctx2, dirty) {
    if (ctx2[18].system.level < 3)
      return create_if_block_2;
    return create_else_block2;
  }
  let current_block_type = select_block_type(ctx, -1);
  let if_block = current_block_type(ctx);
  let each_value_1 = { length: 6 };
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  return {
    c() {
      div = element("div");
      for_1 = element("for");
      span0 = element("span");
      t0 = text(t0_value);
      t1 = text(":\n                            ");
      if_block.c();
      t2 = space();
      against = element("against");
      span1 = element("span");
      t3 = text(t3_value);
      t4 = text(":\n                            ");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(span0, "data-tooltip", span0_data_tooltip_value = game.i18n.localize("MOUSEGUARD.UsedFor"));
      attr(for_1, "class", "svelte-1u8k5nf");
      attr(span1, "data-tooltip", span1_data_tooltip_value = game.i18n.localize("MOUSEGUARD.UsedAgainst"));
      attr(against, "class", "svelte-1u8k5nf");
      attr(div, "class", "item-detail item-uses svelte-1u8k5nf");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, for_1);
      append(for_1, span0);
      append(span0, t0);
      append(span0, t1);
      if_block.m(span0, null);
      append(div, t2);
      append(div, against);
      append(against, span1);
      append(span1, t3);
      append(span1, t4);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(span1, null);
      }
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(span0, null);
        }
      }
      if (dirty & 168) {
        each_value_1 = { length: 6 };
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(span1, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if_block.d();
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_else_block2(ctx) {
  let strong;
  return {
    c() {
      strong = element("strong");
      strong.textContent = "\u221E";
    },
    m(target, anchor) {
      insert(target, strong, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(strong);
    }
  };
}
function create_if_block_2(ctx) {
  let each_1_anchor;
  let each_value_2 = {
    length: parseInt(ctx[18].system.level)
  };
  let each_blocks = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert(target, each_1_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 168) {
        each_value_2 = {
          length: parseInt(ctx2[18].system.level)
        };
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx2, each_value_2, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_2.length;
      }
    },
    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_each_block_2(ctx) {
  let i_1;
  let i_1_class_value;
  let mounted;
  let dispose;
  function click_handler_4(...args) {
    return ctx[14](ctx[18], ctx[23], ...args);
  }
  return {
    c() {
      i_1 = element("i");
      attr(i_1, "class", i_1_class_value = "far " + (ctx[7](ctx[18].system.usedfor, ctx[23]) < 0 ? "fa-circle-check" : "fa-circle"));
    },
    m(target, anchor) {
      insert(target, i_1, anchor);
      if (!mounted) {
        dispose = listen(i_1, "click", click_handler_4);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 8 && i_1_class_value !== (i_1_class_value = "far " + (ctx[7](ctx[18].system.usedfor, ctx[23]) < 0 ? "fa-circle-check" : "fa-circle"))) {
        attr(i_1, "class", i_1_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(i_1);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_1(ctx) {
  let i_1;
  let i_1_class_value;
  let mounted;
  let dispose;
  function click_handler_5(...args) {
    return ctx[15](ctx[18], ctx[23], ...args);
  }
  return {
    c() {
      i_1 = element("i");
      attr(i_1, "class", i_1_class_value = "far " + (ctx[7](ctx[18].system.usedagainst, ctx[23]) < 0 ? "fa-circle-check" : "fa-circle"));
    },
    m(target, anchor) {
      insert(target, i_1, anchor);
      if (!mounted) {
        dispose = listen(i_1, "click", click_handler_5);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 8 && i_1_class_value !== (i_1_class_value = "far " + (ctx[7](ctx[18].system.usedagainst, ctx[23]) < 0 ? "fa-circle-check" : "fa-circle"))) {
        attr(i_1, "class", i_1_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(i_1);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block3(ctx) {
  let div;
  let raw_value = ctx[18].system.description + "";
  return {
    c() {
      div = element("div");
      attr(div, "class", "item-summary svelte-1u8k5nf");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      div.innerHTML = raw_value;
    },
    p(ctx2, dirty) {
      if (dirty & 8 && raw_value !== (raw_value = ctx2[18].system.description + ""))
        div.innerHTML = raw_value;
      ;
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_each_block(ctx) {
  let ol;
  let li;
  let div1;
  let div0;
  let t0;
  let h4;
  let t1_value = ctx[18].name + "";
  let t1;
  let t2;
  let t3;
  let t4;
  let t5;
  let div2;
  let a0;
  let t6;
  let a1;
  let t7;
  let t8;
  let ol_name_value;
  let mounted;
  let dispose;
  function click_handler(...args) {
    return ctx[9](ctx[18], ...args);
  }
  function click_handler_1(...args) {
    return ctx[10](ctx[18], ...args);
  }
  let if_block0 = ctx[6].showRating && create_if_block_4(ctx);
  let if_block1 = ctx[6].showAdvance && !ctx[1] && create_if_block_3(ctx);
  let if_block2 = ctx[0] === "trait" && !ctx[1] && create_if_block_1(ctx);
  let if_block3 = ctx[2][ctx[18].id] && ctx[18].system.description && create_if_block3(ctx);
  return {
    c() {
      ol = element("ol");
      li = element("li");
      div1 = element("div");
      div0 = element("div");
      t0 = space();
      h4 = element("h4");
      t1 = text(t1_value);
      t2 = space();
      if (if_block0)
        if_block0.c();
      t3 = space();
      if (if_block1)
        if_block1.c();
      t4 = space();
      if (if_block2)
        if_block2.c();
      t5 = space();
      div2 = element("div");
      a0 = element("a");
      a0.innerHTML = `<i class="fas fa-edit"></i>`;
      t6 = space();
      a1 = element("a");
      a1.innerHTML = `<i class="fas fa-trash"></i>`;
      t7 = space();
      if (if_block3)
        if_block3.c();
      t8 = space();
      attr(div0, "class", "item-image svelte-1u8k5nf");
      set_style(div0, "background-image", "url(" + ctx[18].img + ")");
      attr(h4, "class", "svelte-1u8k5nf");
      attr(div1, "class", "item-name flexrow rollable svelte-1u8k5nf");
      attr(a0, "class", "item-control item-edit svelte-1u8k5nf");
      attr(a1, "class", "item-control item-delete svelte-1u8k5nf");
      attr(div2, "class", "item-controls flexrow svelte-1u8k5nf");
      attr(li, "class", "item flexrow svelte-1u8k5nf");
      attr(ol, "class", "item-list svelte-1u8k5nf");
      attr(ol, "name", ol_name_value = ctx[18].id);
    },
    m(target, anchor) {
      insert(target, ol, anchor);
      append(ol, li);
      append(li, div1);
      append(div1, div0);
      append(div1, t0);
      append(div1, h4);
      append(h4, t1);
      append(li, t2);
      if (if_block0)
        if_block0.m(li, null);
      append(li, t3);
      if (if_block1)
        if_block1.m(li, null);
      append(li, t4);
      if (if_block2)
        if_block2.m(li, null);
      append(li, t5);
      append(li, div2);
      append(div2, a0);
      append(div2, t6);
      append(div2, a1);
      append(li, t7);
      if (if_block3)
        if_block3.m(li, null);
      append(ol, t8);
      if (!mounted) {
        dispose = [
          listen(div0, "click", click_handler),
          listen(h4, "click", click_handler_1),
          listen(a0, "click", function() {
            if (is_function(ctx[5]?._onItemUpdate(ctx[18].id)))
              ctx[5]?._onItemUpdate(ctx[18].id).apply(this, arguments);
          }),
          listen(a1, "click", function() {
            if (is_function(ctx[5]?._onItemDelete(ctx[18].id)))
              ctx[5]?._onItemDelete(ctx[18].id).apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 8) {
        set_style(div0, "background-image", "url(" + ctx[18].img + ")");
      }
      if (dirty & 8 && t1_value !== (t1_value = ctx[18].name + ""))
        set_data(t1, t1_value);
      if (ctx[6].showRating)
        if_block0.p(ctx, dirty);
      if (ctx[6].showAdvance && !ctx[1]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_3(ctx);
          if_block1.c();
          if_block1.m(li, t4);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (ctx[0] === "trait" && !ctx[1]) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_1(ctx);
          if_block2.c();
          if_block2.m(li, t5);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (ctx[2][ctx[18].id] && ctx[18].system.description) {
        if (if_block3) {
          if_block3.p(ctx, dirty);
        } else {
          if_block3 = create_if_block3(ctx);
          if_block3.c();
          if_block3.m(li, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
      if (dirty & 8 && ol_name_value !== (ol_name_value = ctx[18].id)) {
        attr(ol, "name", ol_name_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(ol);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      if (if_block3)
        if_block3.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment4(ctx) {
  let li;
  let h3;
  let t1;
  let t2;
  let t3;
  let t4;
  let div;
  let a;
  let i;
  let t5;
  let t6_value = game.i18n.localize("MOUSEGUARD.Add") + "";
  let t6;
  let t7;
  let each_1_anchor;
  let mounted;
  let dispose;
  let if_block0 = ctx[6].showRating && create_if_block_7(ctx);
  let if_block1 = ctx[6].showAdvance && !ctx[1] && create_if_block_6(ctx);
  let if_block2 = ctx[0] === "trait" && !ctx[1] && create_if_block_5(ctx);
  let each_value = ctx[3];
  let each_blocks = [];
  for (let i2 = 0; i2 < each_value.length; i2 += 1) {
    each_blocks[i2] = create_each_block(get_each_context(ctx, each_value, i2));
  }
  return {
    c() {
      li = element("li");
      h3 = element("h3");
      h3.textContent = `${ctx[6].header}`;
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      if (if_block1)
        if_block1.c();
      t3 = space();
      if (if_block2)
        if_block2.c();
      t4 = space();
      div = element("div");
      a = element("a");
      i = element("i");
      t5 = space();
      t6 = text(t6_value);
      t7 = space();
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        each_blocks[i2].c();
      }
      each_1_anchor = empty();
      attr(h3, "class", "item-name flexrow svelte-1u8k5nf");
      attr(i, "class", "fas fa-plus");
      attr(a, "class", "item-control item-create svelte-1u8k5nf");
      attr(div, "class", "item-controls flexrow svelte-1u8k5nf");
      attr(li, "class", "items-header flexrow svelte-1u8k5nf");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, h3);
      append(li, t1);
      if (if_block0)
        if_block0.m(li, null);
      append(li, t2);
      if (if_block1)
        if_block1.m(li, null);
      append(li, t3);
      if (if_block2)
        if_block2.m(li, null);
      append(li, t4);
      append(li, div);
      append(div, a);
      append(a, i);
      append(a, t5);
      append(a, t6);
      insert(target, t7, anchor);
      for (let i2 = 0; i2 < each_blocks.length; i2 += 1) {
        each_blocks[i2].m(target, anchor);
      }
      insert(target, each_1_anchor, anchor);
      if (!mounted) {
        dispose = listen(a, "click", ctx[6].add());
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[6].showRating)
        if_block0.p(ctx2, dirty);
      if (ctx2[6].showAdvance && !ctx2[1]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_6(ctx2);
          if_block1.c();
          if_block1.m(li, t3);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (ctx2[0] === "trait" && !ctx2[1]) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block_5(ctx2);
          if_block2.c();
          if_block2.m(li, t4);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (dirty & 239) {
        each_value = ctx2[3];
        let i2;
        for (i2 = 0; i2 < each_value.length; i2 += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i2);
          if (each_blocks[i2]) {
            each_blocks[i2].p(child_ctx, dirty);
          } else {
            each_blocks[i2] = create_each_block(child_ctx);
            each_blocks[i2].c();
            each_blocks[i2].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i2 < each_blocks.length; i2 += 1) {
          each_blocks[i2].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(li);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      if (detaching)
        detach(t7);
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
      mounted = false;
      dispose();
    }
  };
}
function instance4($$self, $$props, $$invalidate) {
  let items;
  let displayDescription;
  let $sheetData;
  let { itemType } = $$props;
  let { isNpc } = $$props;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(8, $sheetData = value));
  let { sheet } = $sheetData;
  let data;
  let itemTypeConfigs = {
    wise: {
      header: game.i18n.localize("MOUSEGUARD.Wises"),
      add: () => () => {
        let cls = getDocumentClass("Item");
        return cls.create({
          name: game.i18n.localize("MOUSEGUARD.ItemNew"),
          type: "wise"
        }, { parent: sheet.actor });
      },
      showRating: true,
      ratingPropertyName: game.i18n.localize("MOUSEGUARD.Rank"),
      showAdvance: true,
      ratingProperty: "rank",
      maxRating: 7
    },
    skill: {
      header: game.i18n.localize("MOUSEGUARD.Skills"),
      add: () => () => game.packs.get("mouseguard.skills").render(true),
      showRating: true,
      ratingPropertyName: game.i18n.localize("MOUSEGUARD.Rank"),
      showAdvance: true,
      ratingProperty: "rank",
      maxRating: 7
    },
    trait: {
      header: game.i18n.localize("MOUSEGUARD.Traits"),
      add: () => () => game.packs.get("mouseguard.traits").render(true),
      showRating: true,
      ratingPropertyName: game.i18n.localize("MOUSEGUARD.Level"),
      ratingProperty: "level",
      maxRating: 3
    }
  };
  let itemTypeConfig = itemTypeConfigs[itemType];
  const advancementStep = (advancement, position) => advancement > position ? -1 : 1;
  const click_handler = (item2, e) => setMouseDice(sheet, item2.system[itemTypeConfig.ratingProperty], game.i18n.localize(item2.name));
  const click_handler_1 = (item2, e) => $$invalidate(2, displayDescription[item2.id] = !displayDescription[item2.id], displayDescription);
  const change_handler = (e) => updateRating(sheet, e.target.name, itemTypeConfig.ratingProperty, parseInt(e.target.value));
  const click_handler_2 = (item2, i, e) => updateRating(sheet, item2.id, "pass", parseInt(item2.system.pass) + advancementStep(item2.system.pass, i));
  const click_handler_3 = (item2, i, e) => updateRating(sheet, item2.id, "fail", parseInt(item2.system.fail) + advancementStep(item2.system.fail, i));
  const click_handler_4 = (item2, i, e) => updateRating(sheet, item2.id, "usedfor", parseInt(item2.system.usedfor) + advancementStep(item2.system.usedfor, i));
  const click_handler_5 = (item2, i, e) => updateRating(sheet, item2.id, "usedagainst", parseInt(item2.system.usedagainst) + advancementStep(item2.system.usedagainst, i));
  $$self.$$set = ($$props2) => {
    if ("itemType" in $$props2)
      $$invalidate(0, itemType = $$props2.itemType);
    if ("isNpc" in $$props2)
      $$invalidate(1, isNpc = $$props2.isNpc);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 256) {
      $:
        data = $sheetData.data;
    }
    if ($$self.$$.dirty & 257) {
      $:
        $$invalidate(3, items = $sheetData.data.system.itemTypes[itemType]);
    }
  };
  $:
    $$invalidate(2, displayDescription = {});
  return [
    itemType,
    isNpc,
    displayDescription,
    items,
    sheetData,
    sheet,
    itemTypeConfig,
    advancementStep,
    $sheetData,
    click_handler,
    click_handler_1,
    change_handler,
    click_handler_2,
    click_handler_3,
    click_handler_4,
    click_handler_5
  ];
}
var MouseGuardActorSheetItemList = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance4, create_fragment4, safe_not_equal, { itemType: 0, isNpc: 1 });
  }
};
var MouseGuardActorSheetItemList_default = MouseGuardActorSheetItemList;

// module/svelte/MouseGuardActorSheetAbilityList.svelte
function get_each_context2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  return child_ctx;
}
function get_each_context_12(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  child_ctx[17] = i;
  return child_ctx;
}
function get_each_context_22(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  child_ctx[17] = i;
  return child_ctx;
}
function create_if_block_12(ctx) {
  let div;
  let t1;
  let input;
  let input_name_value;
  let input_max_value;
  let input_value_value;
  let input_data_tooltip_value;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      div.textContent = "/";
      t1 = space();
      input = element("input");
      attr(div, "class", "divider svelte-18ydmmm");
      attr(input, "name", input_name_value = ctx[12].id);
      attr(input, "type", "number");
      attr(input, "min", "0");
      attr(input, "max", input_max_value = ctx[12].system.rating);
      input.value = input_value_value = ctx[12].system.tax;
      attr(input, "data-tooltip", input_data_tooltip_value = game.i18n.localize("MOUSEGUARD.Tax"));
      attr(input, "class", "svelte-18ydmmm");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      insert(target, t1, anchor);
      insert(target, input, anchor);
      if (!mounted) {
        dispose = listen(input, "change", ctx[8]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & 2 && input_name_value !== (input_name_value = ctx2[12].id)) {
        attr(input, "name", input_name_value);
      }
      if (dirty & 2 && input_max_value !== (input_max_value = ctx2[12].system.rating)) {
        attr(input, "max", input_max_value);
      }
      if (dirty & 2 && input_value_value !== (input_value_value = ctx2[12].system.tax) && input.value !== input_value_value) {
        input.value = input_value_value;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(input);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block4(ctx) {
  let div;
  let pass;
  let span0;
  let t0_value = game.i18n.localize("MOUSEGUARD.PassesAbbr") + "";
  let t0;
  let t1;
  let span0_data_tooltip_value;
  let t2;
  let fail;
  let span1;
  let t3_value = game.i18n.localize("MOUSEGUARD.FailsAbbr") + "";
  let t3;
  let t4;
  let span1_data_tooltip_value;
  let each_value_2 = {
    length: parseInt(ctx[12].system.rating) + 1
  };
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks_1[i] = create_each_block_22(get_each_context_22(ctx, each_value_2, i));
  }
  let each_value_1 = {
    length: parseInt(ctx[12].system.rating)
  };
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_12(get_each_context_12(ctx, each_value_1, i));
  }
  return {
    c() {
      div = element("div");
      pass = element("pass");
      span0 = element("span");
      t0 = text(t0_value);
      t1 = text(":\n                            ");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t2 = space();
      fail = element("fail");
      span1 = element("span");
      t3 = text(t3_value);
      t4 = text(":\n                            ");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(span0, "data-tooltip", span0_data_tooltip_value = game.i18n.localize("MOUSEGUARD.Passes"));
      attr(pass, "class", "svelte-18ydmmm");
      attr(span1, "data-tooltip", span1_data_tooltip_value = game.i18n.localize("MOUSEGUARD.Fails"));
      attr(fail, "class", "svelte-18ydmmm");
      attr(div, "class", "item-detail item-advancement svelte-18ydmmm");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, pass);
      append(pass, span0);
      append(span0, t0);
      append(span0, t1);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].m(span0, null);
      }
      append(div, t2);
      append(div, fail);
      append(fail, span1);
      append(span1, t3);
      append(span1, t4);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(span1, null);
      }
    },
    p(ctx2, dirty) {
      if (dirty & 26) {
        each_value_2 = {
          length: parseInt(ctx2[12].system.rating) + 1
        };
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_22(ctx2, each_value_2, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
          } else {
            each_blocks_1[i] = create_each_block_22(child_ctx);
            each_blocks_1[i].c();
            each_blocks_1[i].m(span0, null);
          }
        }
        for (; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].d(1);
        }
        each_blocks_1.length = each_value_2.length;
      }
      if (dirty & 26) {
        each_value_1 = {
          length: parseInt(ctx2[12].system.rating)
        };
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_12(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_12(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(span1, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block_22(ctx) {
  let i_1;
  let i_1_class_value;
  let mounted;
  let dispose;
  function click_handler_1(...args) {
    return ctx[9](ctx[12], ctx[17], ...args);
  }
  return {
    c() {
      i_1 = element("i");
      attr(i_1, "class", i_1_class_value = "far " + (ctx[4](ctx[12].system.pass, ctx[17]) < 0 ? "fa-circle-check" : "fa-circle"));
    },
    m(target, anchor) {
      insert(target, i_1, anchor);
      if (!mounted) {
        dispose = listen(i_1, "click", click_handler_1);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 2 && i_1_class_value !== (i_1_class_value = "far " + (ctx[4](ctx[12].system.pass, ctx[17]) < 0 ? "fa-circle-check" : "fa-circle"))) {
        attr(i_1, "class", i_1_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(i_1);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_12(ctx) {
  let i_1;
  let i_1_class_value;
  let mounted;
  let dispose;
  function click_handler_2(...args) {
    return ctx[10](ctx[12], ctx[17], ...args);
  }
  return {
    c() {
      i_1 = element("i");
      attr(i_1, "class", i_1_class_value = "far " + (ctx[4](ctx[12].system.fail, ctx[17]) < 0 ? "fa-circle-check" : "fa-circle"));
    },
    m(target, anchor) {
      insert(target, i_1, anchor);
      if (!mounted) {
        dispose = listen(i_1, "click", click_handler_2);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 2 && i_1_class_value !== (i_1_class_value = "far " + (ctx[4](ctx[12].system.fail, ctx[17]) < 0 ? "fa-circle-check" : "fa-circle"))) {
        attr(i_1, "class", i_1_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(i_1);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block2(ctx) {
  let ol;
  let li;
  let div0;
  let h4;
  let t0_value = game.i18n.localize(ctx[12].name) + "";
  let t0;
  let t1;
  let div1;
  let input;
  let input_name_value;
  let input_value_value;
  let input_data_tooltip_value;
  let t2;
  let t3;
  let t4;
  let ol_name_value;
  let mounted;
  let dispose;
  function click_handler(...args) {
    return ctx[6](ctx[12], ...args);
  }
  let if_block0 = ctx[12].name === "MOUSEGUARD.MNature" && create_if_block_12(ctx);
  let if_block1 = !ctx[0] && create_if_block4(ctx);
  return {
    c() {
      ol = element("ol");
      li = element("li");
      div0 = element("div");
      h4 = element("h4");
      t0 = text(t0_value);
      t1 = space();
      div1 = element("div");
      input = element("input");
      t2 = space();
      if (if_block0)
        if_block0.c();
      t3 = space();
      if (if_block1)
        if_block1.c();
      t4 = space();
      attr(h4, "class", "box-title svelte-18ydmmm");
      attr(div0, "class", "item-name rollable svelte-18ydmmm");
      attr(input, "name", input_name_value = ctx[12].id);
      attr(input, "type", "number");
      attr(input, "min", "1");
      attr(input, "max", "7");
      input.value = input_value_value = ctx[12].system.rating;
      attr(input, "data-tooltip", input_data_tooltip_value = game.i18n.localize("MOUSEGUARD.Rating"));
      attr(input, "class", "svelte-18ydmmm");
      attr(div1, "class", "item-detail item-rank flexrow svelte-18ydmmm");
      attr(li, "class", "item flexrow svelte-18ydmmm");
      attr(ol, "class", "item-list svelte-18ydmmm");
      attr(ol, "name", ol_name_value = ctx[12].id);
    },
    m(target, anchor) {
      insert(target, ol, anchor);
      append(ol, li);
      append(li, div0);
      append(div0, h4);
      append(h4, t0);
      append(li, t1);
      append(li, div1);
      append(div1, input);
      append(div1, t2);
      if (if_block0)
        if_block0.m(div1, null);
      append(li, t3);
      if (if_block1)
        if_block1.m(li, null);
      append(ol, t4);
      if (!mounted) {
        dispose = [
          listen(h4, "click", click_handler),
          listen(input, "change", ctx[7])
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 2 && t0_value !== (t0_value = game.i18n.localize(ctx[12].name) + ""))
        set_data(t0, t0_value);
      if (dirty & 2 && input_name_value !== (input_name_value = ctx[12].id)) {
        attr(input, "name", input_name_value);
      }
      if (dirty & 2 && input_value_value !== (input_value_value = ctx[12].system.rating) && input.value !== input_value_value) {
        input.value = input_value_value;
      }
      if (ctx[12].name === "MOUSEGUARD.MNature") {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_12(ctx);
          if_block0.c();
          if_block0.m(div1, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (!ctx[0]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block4(ctx);
          if_block1.c();
          if_block1.m(li, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty & 2 && ol_name_value !== (ol_name_value = ctx[12].id)) {
        attr(ol, "name", ol_name_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(ol);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment5(ctx) {
  let li;
  let h3;
  let t1;
  let each_1_anchor;
  let each_value = ctx[1];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
  }
  return {
    c() {
      li = element("li");
      h3 = element("h3");
      h3.textContent = `${game.i18n.localize("MOUSEGUARD.Abilities")}`;
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
      attr(h3, "class", "item-name flexrow svelte-18ydmmm");
      attr(li, "class", "items-header flexrow svelte-18ydmmm");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, h3);
      insert(target, t1, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert(target, each_1_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & 27) {
        each_value = ctx2[1];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(li);
      if (detaching)
        detach(t1);
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function instance5($$self, $$props, $$invalidate) {
  let items;
  let $sheetData;
  let { isNpc } = $$props;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(5, $sheetData = value));
  let { sheet } = $sheetData;
  let data;
  const advancementStep = (advancement, position) => advancement > position ? -1 : 1;
  const click_handler = (item2, e) => setMouseDice(sheet, item2.system.rating, game.i18n.localize(item2.name));
  const change_handler = (e) => updateRating(sheet, e.target.name, "rating", parseInt(e.target.value));
  const change_handler_1 = (e) => updateRating(sheet, e.target.name, "tax", parseInt(e.target.value));
  const click_handler_1 = (item2, i, e) => updateRating(sheet, item2.id, "pass", parseInt(item2.system.pass) + advancementStep(item2.system.pass, i));
  const click_handler_2 = (item2, i, e) => updateRating(sheet, item2.id, "fail", parseInt(item2.system.fail) + advancementStep(item2.system.fail, i));
  $$self.$$set = ($$props2) => {
    if ("isNpc" in $$props2)
      $$invalidate(0, isNpc = $$props2.isNpc);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 32) {
      $:
        data = $sheetData.data;
    }
    if ($$self.$$.dirty & 32) {
      $:
        $$invalidate(1, items = $sheetData.data.system.itemTypes.ability);
    }
  };
  return [
    isNpc,
    items,
    sheetData,
    sheet,
    advancementStep,
    $sheetData,
    click_handler,
    change_handler,
    change_handler_1,
    click_handler_1,
    click_handler_2
  ];
}
var MouseGuardActorSheetAbilityList = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance5, create_fragment5, safe_not_equal, { isNpc: 0 });
  }
};
var MouseGuardActorSheetAbilityList_default = MouseGuardActorSheetAbilityList;

// module/svelte/MouseGuardActorSheetMouseSkillAbilityTab.svelte
function create_fragment6(ctx) {
  let div0;
  let ol0;
  let mouseguardactorsheetabilitylist;
  let t0;
  let div1;
  let ol1;
  let mouseguardactorsheetitemlist0;
  let t1;
  let mouseguardactorsheetitemlist1;
  let t2;
  let mouseguardactorsheetitemlist2;
  let current;
  mouseguardactorsheetabilitylist = new MouseGuardActorSheetAbilityList_default({ props: { isNpc: ctx[1] } });
  mouseguardactorsheetitemlist0 = new MouseGuardActorSheetItemList_default({
    props: {
      itemType: "wise",
      isNpc: ctx[1]
    }
  });
  mouseguardactorsheetitemlist1 = new MouseGuardActorSheetItemList_default({
    props: {
      itemType: "skill",
      isNpc: ctx[1]
    }
  });
  mouseguardactorsheetitemlist2 = new MouseGuardActorSheetItemList_default({
    props: {
      itemType: "trait",
      isNpc: ctx[1]
    }
  });
  return {
    c() {
      div0 = element("div");
      ol0 = element("ol");
      create_component(mouseguardactorsheetabilitylist.$$.fragment);
      t0 = space();
      div1 = element("div");
      ol1 = element("ol");
      create_component(mouseguardactorsheetitemlist0.$$.fragment);
      t1 = space();
      create_component(mouseguardactorsheetitemlist1.$$.fragment);
      t2 = space();
      create_component(mouseguardactorsheetitemlist2.$$.fragment);
      attr(ol0, "class", "items-list svelte-1s356y1");
      attr(div0, "class", "abilities svelte-1s356y1");
      attr(ol1, "class", "items-list svelte-1s356y1");
      attr(div1, "class", "items svelte-1s356y1");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, ol0);
      mount_component(mouseguardactorsheetabilitylist, ol0, null);
      insert(target, t0, anchor);
      insert(target, div1, anchor);
      append(div1, ol1);
      mount_component(mouseguardactorsheetitemlist0, ol1, null);
      append(ol1, t1);
      mount_component(mouseguardactorsheetitemlist1, ol1, null);
      append(ol1, t2);
      mount_component(mouseguardactorsheetitemlist2, ol1, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(mouseguardactorsheetabilitylist.$$.fragment, local);
      transition_in(mouseguardactorsheetitemlist0.$$.fragment, local);
      transition_in(mouseguardactorsheetitemlist1.$$.fragment, local);
      transition_in(mouseguardactorsheetitemlist2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(mouseguardactorsheetabilitylist.$$.fragment, local);
      transition_out(mouseguardactorsheetitemlist0.$$.fragment, local);
      transition_out(mouseguardactorsheetitemlist1.$$.fragment, local);
      transition_out(mouseguardactorsheetitemlist2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      destroy_component(mouseguardactorsheetabilitylist);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div1);
      destroy_component(mouseguardactorsheetitemlist0);
      destroy_component(mouseguardactorsheetitemlist1);
      destroy_component(mouseguardactorsheetitemlist2);
    }
  };
}
function instance6($$self, $$props, $$invalidate) {
  let $sheetData;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(2, $sheetData = value));
  let isNpc = $sheetData.actor.type !== "character";
  return [sheetData, isNpc];
}
var MouseGuardActorSheetMouseSkillAbilityTab = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance6, create_fragment6, safe_not_equal, {});
  }
};
var MouseGuardActorSheetMouseSkillAbilityTab_default = MouseGuardActorSheetMouseSkillAbilityTab;

// module/svelte/MouseGuardActorSheetDisposition.svelte
function create_fragment7(ctx) {
  let div2;
  let label;
  let t1;
  let div1;
  let input0;
  let input0_value_value;
  let input0_data_tooltip_value;
  let t2;
  let div0;
  let t4;
  let input1;
  let input1_value_value;
  let input1_data_tooltip_value;
  return {
    c() {
      div2 = element("div");
      label = element("label");
      label.textContent = `${game.i18n.localize("MOUSEGUARD.Disposition")}`;
      t1 = space();
      div1 = element("div");
      input0 = element("input");
      t2 = space();
      div0 = element("div");
      div0.textContent = "/";
      t4 = space();
      input1 = element("input");
      attr(label, "class", "header svelte-5lwv33");
      attr(input0, "name", "system.disposition.starting");
      attr(input0, "type", "number");
      attr(input0, "min", "0");
      input0.value = input0_value_value = ctx[0].system.disposition.starting;
      attr(input0, "data-tooltip", input0_data_tooltip_value = game.i18n.localize("MOUSEGUARD.StartingDisposition"));
      attr(input0, "class", "svelte-5lwv33");
      attr(div0, "class", "divider svelte-5lwv33");
      attr(input1, "name", "system.disposition.current");
      attr(input1, "type", "number");
      attr(input1, "min", "0");
      input1.value = input1_value_value = ctx[0].system.disposition.current;
      attr(input1, "data-tooltip", input1_data_tooltip_value = game.i18n.localize("MOUSEGUARD.CurrentDisposition"));
      attr(input1, "class", "svelte-5lwv33");
      attr(div1, "class", "disposition flexrow");
      attr(div2, "class", "disposition-container form-group flexcol svelte-5lwv33");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, label);
      append(div2, t1);
      append(div2, div1);
      append(div1, input0);
      append(div1, t2);
      append(div1, div0);
      append(div1, t4);
      append(div1, input1);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1 && input0_value_value !== (input0_value_value = ctx2[0].system.disposition.starting) && input0.value !== input0_value_value) {
        input0.value = input0_value_value;
      }
      if (dirty & 1 && input1_value_value !== (input1_value_value = ctx2[0].system.disposition.current) && input1.value !== input1_value_value) {
        input1.value = input1_value_value;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div2);
    }
  };
}
function instance7($$self, $$props, $$invalidate) {
  let $sheetData;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(2, $sheetData = value));
  let data;
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 4) {
      $:
        $$invalidate(0, data = $sheetData.data);
    }
  };
  return [data, sheetData, $sheetData];
}
var MouseGuardActorSheetDisposition = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance7, create_fragment7, safe_not_equal, {});
  }
};
var MouseGuardActorSheetDisposition_default = MouseGuardActorSheetDisposition;

// module/svelte/MouseGuardActorSheetPortrait.svelte
function create_fragment8(ctx) {
  let img;
  let img_src_value;
  let img_title_value;
  let mounted;
  let dispose;
  return {
    c() {
      img = element("img");
      attr(img, "class", "profile-img svelte-140opxm");
      attr(img, "data-edit", "img");
      if (!src_url_equal(img.src, img_src_value = ctx[0].img))
        attr(img, "src", img_src_value);
      attr(img, "title", img_title_value = ctx[0].name);
    },
    m(target, anchor) {
      insert(target, img, anchor);
      if (!mounted) {
        dispose = listen(img, "click", ctx[2]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1 && !src_url_equal(img.src, img_src_value = ctx2[0].img)) {
        attr(img, "src", img_src_value);
      }
      if (dirty & 1 && img_title_value !== (img_title_value = ctx2[0].name)) {
        attr(img, "title", img_title_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(img);
      mounted = false;
      dispose();
    }
  };
}
function instance8($$self, $$props, $$invalidate) {
  let $sheetData;
  let { limited } = $$props;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(4, $sheetData = value));
  let { actor, sheet } = $sheetData;
  let data;
  const filePicker = (event) => {
    if (limited) {
      return;
    }
    const attr2 = event.currentTarget.dataset.edit;
    const current = getProperty(data, attr2);
    const fp = new FilePicker({
      type: "image",
      current,
      callback: (path) => {
        actor.update({ [attr2]: path });
      },
      top: sheet.position.top + 40,
      left: sheet.position.left + 10
    });
    return fp.browse();
  };
  $$self.$$set = ($$props2) => {
    if ("limited" in $$props2)
      $$invalidate(3, limited = $$props2.limited);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 16) {
      $:
        $$invalidate(0, data = $sheetData.data);
    }
  };
  return [data, sheetData, filePicker, limited, $sheetData];
}
var MouseGuardActorSheetPortrait = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance8, create_fragment8, safe_not_equal, { limited: 3 });
  }
};
var MouseGuardActorSheetPortrait_default = MouseGuardActorSheetPortrait;

// module/svelte/MouseGuardActorSheetName.svelte
function create_fragment9(ctx) {
  let div;
  let input;
  let input_value_value;
  let input_placeholder_value;
  return {
    c() {
      div = element("div");
      input = element("input");
      attr(input, "name", "name");
      input.disabled = ctx[0];
      attr(input, "type", "text");
      input.value = input_value_value = ctx[1].name;
      attr(input, "placeholder", input_placeholder_value = game.i18n.localize("MOUSEGUARD.Name"));
      attr(input, "class", "svelte-158n7o2");
      attr(div, "class", "namebox svelte-158n7o2");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, input);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        input.disabled = ctx2[0];
      }
      if (dirty & 2 && input_value_value !== (input_value_value = ctx2[1].name) && input.value !== input_value_value) {
        input.value = input_value_value;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function instance9($$self, $$props, $$invalidate) {
  let $sheetData;
  let { limited } = $$props;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(3, $sheetData = value));
  let data;
  $$self.$$set = ($$props2) => {
    if ("limited" in $$props2)
      $$invalidate(0, limited = $$props2.limited);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 8) {
      $:
        $$invalidate(1, data = $sheetData.data);
    }
  };
  return [limited, data, sheetData, $sheetData];
}
var MouseGuardActorSheetName = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance9, create_fragment9, safe_not_equal, { limited: 0 });
  }
};
var MouseGuardActorSheetName_default = MouseGuardActorSheetName;

// module/svelte/MouseGuardActorSheetBase.svelte
function get_each_context3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[4] = list[i];
  return child_ctx;
}
function create_each_block3(ctx) {
  let a;
  let t0_value = ctx[4].label + "";
  let t0;
  let t1;
  let a_class_value;
  let mounted;
  let dispose;
  return {
    c() {
      a = element("a");
      t0 = text(t0_value);
      t1 = space();
      attr(a, "class", a_class_value = "item " + (ctx[0] === ctx[4].component ? "active" : "") + " svelte-1j7ey7e");
    },
    m(target, anchor) {
      insert(target, a, anchor);
      append(a, t0);
      append(a, t1);
      if (!mounted) {
        dispose = listen(a, "click", ctx[2](ctx[4].component));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 1 && a_class_value !== (a_class_value = "item " + (ctx[0] === ctx[4].component ? "active" : "") + " svelte-1j7ey7e")) {
        attr(a, "class", a_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(a);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block5(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = ctx[0];
  function switch_props(ctx2) {
    return {};
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (switch_value !== (switch_value = ctx2[0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_fragment10(ctx) {
  let header;
  let section0;
  let div;
  let mouseguardactorsheetname;
  let t0;
  let mouseguardactorsheetdisposition;
  let t1;
  let nav;
  let t2;
  let section1;
  let mouseguardactorsheetportrait;
  let t3;
  let section4;
  let section2;
  let t4;
  let section3;
  let mouseguardactorsheetmouserewards;
  let current;
  mouseguardactorsheetname = new MouseGuardActorSheetName_default({});
  mouseguardactorsheetdisposition = new MouseGuardActorSheetDisposition_default({});
  let each_value = ctx[1];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block3(get_each_context3(ctx, each_value, i));
  }
  mouseguardactorsheetportrait = new MouseGuardActorSheetPortrait_default({});
  let if_block = ctx[0] && create_if_block5(ctx);
  mouseguardactorsheetmouserewards = new MouseGuardActorSheetMouseRewards_default({});
  return {
    c() {
      header = element("header");
      section0 = element("section");
      div = element("div");
      create_component(mouseguardactorsheetname.$$.fragment);
      t0 = space();
      create_component(mouseguardactorsheetdisposition.$$.fragment);
      t1 = space();
      nav = element("nav");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t2 = space();
      section1 = element("section");
      create_component(mouseguardactorsheetportrait.$$.fragment);
      t3 = space();
      section4 = element("section");
      section2 = element("section");
      if (if_block)
        if_block.c();
      t4 = space();
      section3 = element("section");
      create_component(mouseguardactorsheetmouserewards.$$.fragment);
      attr(div, "class", "flexrow");
      attr(nav, "class", "sheet-navigation tabs svelte-1j7ey7e");
      attr(section0, "class", "left-col");
      attr(section1, "class", "right-col svelte-1j7ey7e");
      attr(header, "class", "flexrow");
      attr(section2, "class", "tab flexrow svelte-1j7ey7e");
      attr(section3, "class", "right-col flexcol svelte-1j7ey7e");
      attr(section4, "class", "sheet-body flexrow svelte-1j7ey7e");
    },
    m(target, anchor) {
      insert(target, header, anchor);
      append(header, section0);
      append(section0, div);
      mount_component(mouseguardactorsheetname, div, null);
      append(div, t0);
      mount_component(mouseguardactorsheetdisposition, div, null);
      append(section0, t1);
      append(section0, nav);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(nav, null);
      }
      append(header, t2);
      append(header, section1);
      mount_component(mouseguardactorsheetportrait, section1, null);
      insert(target, t3, anchor);
      insert(target, section4, anchor);
      append(section4, section2);
      if (if_block)
        if_block.m(section2, null);
      append(section4, t4);
      append(section4, section3);
      mount_component(mouseguardactorsheetmouserewards, section3, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (dirty & 7) {
        each_value = ctx2[1];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context3(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block3(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(nav, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block5(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(section2, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(mouseguardactorsheetname.$$.fragment, local);
      transition_in(mouseguardactorsheetdisposition.$$.fragment, local);
      transition_in(mouseguardactorsheetportrait.$$.fragment, local);
      transition_in(if_block);
      transition_in(mouseguardactorsheetmouserewards.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(mouseguardactorsheetname.$$.fragment, local);
      transition_out(mouseguardactorsheetdisposition.$$.fragment, local);
      transition_out(mouseguardactorsheetportrait.$$.fragment, local);
      transition_out(if_block);
      transition_out(mouseguardactorsheetmouserewards.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(header);
      destroy_component(mouseguardactorsheetname);
      destroy_component(mouseguardactorsheetdisposition);
      destroy_each(each_blocks, detaching);
      destroy_component(mouseguardactorsheetportrait);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(section4);
      if (if_block)
        if_block.d();
      destroy_component(mouseguardactorsheetmouserewards);
    }
  };
}
function instance10($$self, $$props, $$invalidate) {
  let { dataStore } = $$props;
  setContext("sheetStore", dataStore);
  let items = [
    {
      label: game.i18n.localize("MOUSEGUARD.Characteristics"),
      component: MouseGuardActorSheetMouseSkillAbilityTab_default
    },
    {
      label: game.i18n.localize("MOUSEGUARD.About"),
      component: MouseGuardActorSheetMouseDetails_default
    }
  ];
  let { activeTabValue = items[0].component } = $$props;
  const handleClick = (tabValue) => () => $$invalidate(0, activeTabValue = tabValue);
  $$self.$$set = ($$props2) => {
    if ("dataStore" in $$props2)
      $$invalidate(3, dataStore = $$props2.dataStore);
    if ("activeTabValue" in $$props2)
      $$invalidate(0, activeTabValue = $$props2.activeTabValue);
  };
  return [activeTabValue, items, handleClick, dataStore];
}
var MouseGuardActorSheetBase = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance10, create_fragment10, safe_not_equal, { dataStore: 3, activeTabValue: 0 });
  }
};
var MouseGuardActorSheetBase_default = MouseGuardActorSheetBase;

// node_modules/svelte/store/index.mjs
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}

// module/actor-sheet.js
var MouseGuardActorSheet = class extends ActorSheet {
  app = null;
  dataStore = null;
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["mouseguard", "sheet", "actor"],
      template: "systems/mouseguard/templates/actor-sheetv2.html",
      width: 700,
      height: 600,
      tabs: []
    });
  }
  getData() {
    const context = super.getData();
    context.sheet = this;
    return context;
  }
  _getSubmitData(updateData) {
    let formData = super._getSubmitData(updateData);
    return formData;
  }
  _setMouseDice(count, message = "") {
    game.mouseguard.RollCount = count;
    game.mouseguard.RollMessage = message;
    game.mouseguard.updateDisplay(count);
  }
  async _updateEmbededItem(id, _data) {
    await this.actor.updateEmbeddedDocuments("Item", [
      { _id: id, data: _data }
    ]);
  }
  async _onItemUpdate(itemId) {
    const item2 = this.actor.items.get(itemId);
    return item2.sheet.render(true);
  }
  async _onItemDelete(itemId) {
    const item2 = this.actor.items.get(itemId);
    item2.delete();
    this.render();
  }
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const data = duplicate(header.dataset);
    const name = `New ${type.capitalize()}`;
    const itemData = {
      name,
      type,
      data
    };
    itemData.data = { rank: 1 };
    delete itemData.data["type"];
    return await Item.create(itemData, { parent: this.actor }).then((item2) => {
      item2.sheet.render(true);
    });
  }
  render(force = false, options = {}) {
    let sheetData = this.getData();
    if (this.app !== null) {
      let states = Application.RENDER_STATES;
      if (this._state == states.RENDERING || this._state == states.RENDERED) {
        this.dataStore?.set(sheetData);
        return;
      }
    }
    this._render(force, options).catch((err) => {
      err.message = `An error occurred while rendering ${this.constructor.name} ${this.appId}: ${err.message}`;
      console.error(err);
      this._state = Application.RENDER_STATES.ERROR;
    }).then((rendered) => {
      this.dataStore = writable(sheetData);
      this.app = new MouseGuardActorSheetBase_default({
        target: this.element.find("form").get(0),
        props: {
          dataStore: this.dataStore
        }
      });
    });
    options.editable = options.editable ?? this.object.isOwner;
    this.object.apps[this.appId] = this;
    return this;
  }
  close(options = {}) {
    if (this.app != null) {
      this.app.$destroy();
      this.app = null;
      this.dataStore = null;
    }
    return super.close(options);
  }
};

// module/svelte/MouseGuardNPCActorSheetBase.svelte
function create_fragment11(ctx) {
  let header;
  let section0;
  let div0;
  let mouseguardactorsheetname;
  let t0;
  let mouseguardactorsheetdisposition;
  let t1;
  let div3;
  let div1;
  let t2_value = game.i18n.localize("MOUSEGUARD.CharacterType") + "";
  let t2;
  let t3;
  let t4_value = game.i18n.localize("ACTOR.Type" + ctx[1].actor.type.capitalize()) + "";
  let t4;
  let t5;
  let div2;
  let t6;
  let section1;
  let mouseguardactorsheetmouseportrait;
  let t7;
  let section4;
  let section2;
  let mouseguardactorsheetmouseskillabilitytab;
  let t8;
  let section3;
  let mouseguardeditor;
  let current;
  mouseguardactorsheetname = new MouseGuardActorSheetName_default({});
  mouseguardactorsheetdisposition = new MouseGuardActorSheetDisposition_default({});
  mouseguardactorsheetmouseportrait = new MouseGuardActorSheetPortrait_default({});
  mouseguardactorsheetmouseskillabilitytab = new MouseGuardActorSheetMouseSkillAbilityTab_default({});
  mouseguardeditor = new MouseGuardEditor_default({ props: { target: "system.description" } });
  return {
    c() {
      header = element("header");
      section0 = element("section");
      div0 = element("div");
      create_component(mouseguardactorsheetname.$$.fragment);
      t0 = space();
      create_component(mouseguardactorsheetdisposition.$$.fragment);
      t1 = space();
      div3 = element("div");
      div1 = element("div");
      t2 = text(t2_value);
      t3 = text(":\n                ");
      t4 = text(t4_value);
      t5 = space();
      div2 = element("div");
      t6 = space();
      section1 = element("section");
      create_component(mouseguardactorsheetmouseportrait.$$.fragment);
      t7 = space();
      section4 = element("section");
      section2 = element("section");
      create_component(mouseguardactorsheetmouseskillabilitytab.$$.fragment);
      t8 = space();
      section3 = element("section");
      create_component(mouseguardeditor.$$.fragment);
      attr(div0, "class", "flexrow");
      attr(div1, "class", "npc-type");
      attr(div2, "class", "npc-size");
      attr(div3, "class", "npc-info flexrow svelte-1769479");
      attr(section0, "class", "left-col");
      attr(section1, "class", "right-col svelte-1769479");
      attr(header, "class", "flexrow");
      attr(section2, "class", "flexrow");
      attr(section3, "class", "flexrow");
      attr(section4, "class", "sheet-body flexcol svelte-1769479");
    },
    m(target, anchor) {
      insert(target, header, anchor);
      append(header, section0);
      append(section0, div0);
      mount_component(mouseguardactorsheetname, div0, null);
      append(div0, t0);
      mount_component(mouseguardactorsheetdisposition, div0, null);
      append(section0, t1);
      append(section0, div3);
      append(div3, div1);
      append(div1, t2);
      append(div1, t3);
      append(div1, t4);
      append(div3, t5);
      append(div3, div2);
      append(header, t6);
      append(header, section1);
      mount_component(mouseguardactorsheetmouseportrait, section1, null);
      insert(target, t7, anchor);
      insert(target, section4, anchor);
      append(section4, section2);
      mount_component(mouseguardactorsheetmouseskillabilitytab, section2, null);
      append(section4, t8);
      append(section4, section3);
      mount_component(mouseguardeditor, section3, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if ((!current || dirty & 2) && t4_value !== (t4_value = game.i18n.localize("ACTOR.Type" + ctx2[1].actor.type.capitalize()) + ""))
        set_data(t4, t4_value);
    },
    i(local) {
      if (current)
        return;
      transition_in(mouseguardactorsheetname.$$.fragment, local);
      transition_in(mouseguardactorsheetdisposition.$$.fragment, local);
      transition_in(mouseguardactorsheetmouseportrait.$$.fragment, local);
      transition_in(mouseguardactorsheetmouseskillabilitytab.$$.fragment, local);
      transition_in(mouseguardeditor.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(mouseguardactorsheetname.$$.fragment, local);
      transition_out(mouseguardactorsheetdisposition.$$.fragment, local);
      transition_out(mouseguardactorsheetmouseportrait.$$.fragment, local);
      transition_out(mouseguardactorsheetmouseskillabilitytab.$$.fragment, local);
      transition_out(mouseguardeditor.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(header);
      destroy_component(mouseguardactorsheetname);
      destroy_component(mouseguardactorsheetdisposition);
      destroy_component(mouseguardactorsheetmouseportrait);
      if (detaching)
        detach(t7);
      if (detaching)
        detach(section4);
      destroy_component(mouseguardactorsheetmouseskillabilitytab);
      destroy_component(mouseguardeditor);
    }
  };
}
function instance11($$self, $$props, $$invalidate) {
  let $dataStore, $$unsubscribe_dataStore = noop, $$subscribe_dataStore = () => ($$unsubscribe_dataStore(), $$unsubscribe_dataStore = subscribe(dataStore, ($$value) => $$invalidate(1, $dataStore = $$value)), dataStore);
  $$self.$$.on_destroy.push(() => $$unsubscribe_dataStore());
  let { dataStore } = $$props;
  $$subscribe_dataStore();
  setContext("sheetStore", dataStore);
  $$self.$$set = ($$props2) => {
    if ("dataStore" in $$props2)
      $$subscribe_dataStore($$invalidate(0, dataStore = $$props2.dataStore));
  };
  return [dataStore, $dataStore];
}
var MouseGuardNPCActorSheetBase = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance11, create_fragment11, safe_not_equal, { dataStore: 0 });
  }
};
var MouseGuardNPCActorSheetBase_default = MouseGuardNPCActorSheetBase;

// module/npcactor-sheet.js
var MouseGuardNPCActorSheet = class extends ActorSheet {
  app = null;
  dataStore = null;
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["mouseguard", "sheet", "actor"],
      template: "systems/mouseguard/templates/actor-sheetv2.html",
      width: 550,
      height: 600,
      tabs: []
    });
  }
  getData() {
    const context = super.getData();
    context.systemData = context.system;
    context.sheet = this;
    return context;
  }
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable)
      return;
    html.find(".item-control").click(this._onItemControl.bind(this));
    html.find(".items .rollable").on("click", this._onItemRoll.bind(this));
  }
  _onItemControl(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const li = button.closest(".item");
    const item2 = this.actor.items.get(li?.dataset.itemId);
    switch (button.dataset.action) {
      case "create":
        const cls = getDocumentClass("Item");
        return cls.create({
          name: game.i18n.localize("MOUSEGUARD.ItemNew"),
          type: "item"
        }, { parent: this.actor });
      case "edit":
        return item2.sheet.render(true);
      case "delete":
        return item2.delete();
    }
  }
  _onItemRoll(event) {
    let button = $(event.currentTarget);
    const li = button.parents(".item");
    const item2 = this.actor.items.get(li.data("itemId"));
    let r = new Roll(button.data("roll"), this.actor.getRollData());
    return r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `<h2>${item2.name}</h2><h3>${button.text()}</h3>`
    });
  }
  _getSubmitData(updateData) {
    let formData = super._getSubmitData(updateData);
    return formData;
  }
  _setMouseDice(count) {
    game.mouseguard.RollCount = count;
    game.mouseguard.updateDisplay(count);
  }
  async _updateActorAbility(id, type, value) {
    await this.actor.updateEmbeddedDocuments("Item", [
      { _id: id, data: { [type]: value } }
    ]);
  }
  async _updateEmbededItem(id, _data) {
    await this.actor.updateEmbeddedDocuments("Item", [
      { _id: id, data: _data }
    ]);
  }
  async _onItemDelete(itemId) {
    const item2 = this.actor.items.get(itemId);
    item2.delete();
    this.render();
  }
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const data = duplicate(header.dataset);
    const name = `New ${type.capitalize()}`;
    const itemData = {
      name,
      type,
      data
    };
    itemData.data = { rank: 1 };
    delete itemData.data["type"];
    return await Item.create(itemData, { parent: this.actor }).then((item2) => {
      item2.sheet.render(true);
    });
  }
  render(force = false, options = {}) {
    let sheetData = this.getData();
    if (this.app !== null) {
      let states = Application.RENDER_STATES;
      if (this._state == states.RENDERING || this._state == states.RENDERED) {
        this.dataStore?.set(sheetData);
        return;
      }
    }
    this._render(force, options).catch((err) => {
      err.message = `An error occurred while rendering ${this.constructor.name} ${this.appId}: ${err.message}`;
      console.error(err);
      this._state = Application.RENDER_STATES.ERROR;
    }).then((rendered) => {
      this.dataStore = writable(sheetData);
      this.app = new MouseGuardNPCActorSheetBase_default({
        target: this.element.find("form").get(0),
        props: {
          dataStore: this.dataStore
        }
      });
    });
    options.editable = options.editable ?? this.object.isOwner;
    this.object.apps[this.appId] = this;
    return this;
  }
  close(options = {}) {
    if (this.app != null) {
      this.app.$destroy();
      this.app = null;
      this.dataStore = null;
    }
    return super.close(options);
  }
};

// module/templates.js
var preloadHandlebarsTemplates = async function() {
  const templatePaths = [
    "systems/mouseguard/templates/parts/sheet-attributes.html",
    "systems/mouseguard/templates/parts/sheet-groups.html",
    "systems/mouseguard/templates/sidebar/combatant.html",
    "systems/mouseguard/templates/effects/effects-panel.hbs",
    "systems/mouseguard/templates/effects/effect.hbs"
  ];
  return loadTemplates(templatePaths);
};

// module/macro.js
async function createMouseGuardMacro(data, slot) {
  const command = `const roll = new Roll("${data.roll}", actor ? actor.getRollData() : {});
  roll.toMessage({speaker, flavor: "${data.label}"});`;
  let macro = game.macros.entities.find((m) => m.name === item.label && m.command === command);
  if (!macro) {
    macro = await Macro.create({
      name: data.label,
      type: "script",
      command,
      flags: { "mouseguard.attrMacro": true }
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

// module/mousedie.js
var MouseDie = class extends Die {
  constructor(termData) {
    termData.faces = 6;
    super(termData);
  }
  getResultLabel(result) {
    return {
      1: '<img src="systems/mouseguard/assets/dice/snake.png" />',
      2: '<img src="systems/mouseguard/assets/dice/snake.png" />',
      3: '<img src="systems/mouseguard/assets/dice/snake.png" />',
      4: '<img src="systems/mouseguard/assets/dice/sword.png" />',
      5: '<img src="systems/mouseguard/assets/dice/sword.png" />',
      6: '<img src="systems/mouseguard/assets/dice/axe.png" />'
    }[result.result];
  }
};
__publicField(MouseDie, "DENOMINATION", "m");
var mouseChatData = async (roll, chatOptions) => {
  const isPrivate = chatOptions.isPrivate;
  return {
    formula: isPrivate ? "???" : roll._formula,
    flavor: isPrivate ? null : chatOptions.flavor,
    user: chatOptions.user,
    tooltip: isPrivate ? "" : await roll.getTooltip(),
    result: isPrivate ? "?" : roll.result,
    dice_count: isPrivate ? "?" : roll.terms[0].number,
    drop: false,
    claimed: roll.claimed ?? false
  };
};
var MouseRoll = class extends Roll {
  constructor(...args) {
    super(...args);
  }
  async render(chatOptions = {}) {
    chatOptions = foundry.utils.mergeObject({
      user: game.user.id,
      flavor: null,
      template: this.constructor.CHAT_TEMPLATE,
      blind: false
    }, chatOptions);
    if (!this._evaluated)
      this.evaluate();
    let chatData = await mouseChatData(this, chatOptions);
    return renderTemplate(chatOptions.template, chatData);
  }
};
__publicField(MouseRoll, "CHAT_TEMPLATE", "systems/mouseguard/templates/dice/roll.html");

// module/conflict-tracker.js
var ConflictTracker = class extends FormApplication {
  constructor(object = {}, options = {}) {
    super(object, options);
    this.isRunningQueue = false;
    if (options?.menu) {
      this.menu = options.menu;
    }
  }
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "conflict-tracker",
      classes: ["mouseguard"],
      title: "Conflict Tracker",
      template: "systems/mouseguard/templates/conflict-tracker.html"
    });
  }
  getData() {
    const context = super.getData();
    context.isGM = game.user.isGM;
    const x = $(window).width();
    this.position.left = x / 2 - 505 / 2;
    this.position.top = 10;
    this.position.width = 150;
    this.position.height = 105;
    return context;
  }
  async close(options = {}) {
  }
  activateListeners(html) {
  }
};

// module/mouse-combantant.js
var MouseCombatant = class extends Combatant {
  constructor(...args) {
    super(...args);
  }
  prepareDerivedData() {
    super.prepareDerivedData();
  }
  getData() {
    const context = super.getData();
    return context;
  }
  get ConflictCaptain() {
    return this.getFlag("mouseguard", "ConflictCaptain");
  }
  get team() {
    return this.getFlag("mouseguard", "Team");
  }
  async setConflictCaptain(value) {
    return this.setFlag("mouseguard", "ConflictCaptain", value);
  }
  async SetMove(move) {
    this.setFlag("mouseguard", "Moves", move);
  }
  async setTeam(value) {
    return this.setFlag("mouseguard", "Team", value);
  }
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);
    let init2 = 0;
    let actor = game.actors.get(data.actorId);
    if (actor.type == "character")
      init2 = 1;
    this.updateSource({
      initiative: init2,
      flags: {
        mouseguard: {
          ConflictCaptain: false,
          Moves: [],
          Team: 0
        }
      }
    });
  }
  async doMove(id) {
    let Moves = this.getFlag("mouseguard", "Moves");
    let theMove = Moves.filter((item2) => item2.id == id);
    let template = "systems/mouseguard/templates/chat/combat-action.hbs";
    let data = { actor: [this.actor][0], move: theMove[0].move };
    var content = await renderTemplate(template, data);
    let chatData = {
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: data.actor }),
      flags: { "mouseguard.unflipped": true }
    };
    chatData.content = content;
    ChatMessage.create(chatData);
    let otherMoves = Moves.filter((item2) => item2.id !== id);
    this.SetMove(otherMoves);
  }
};

// module/socket.js
var MouseSocket = class {
  static async askGoal(data) {
    data.this = this;
    let dlg = await renderTemplate("systems/mouseguard/templates/parts/conflict-manager.hbs", data);
    new Dialog({
      title: `Conflict Manager`,
      content: dlg,
      buttons: {
        ok: {
          label: "Apply",
          callback: async (html) => {
            data.this.goalManager(html, data);
          }
        },
        cancel: {
          label: "Cancel"
        }
      },
      default: "ok"
    }).render(true);
  }
  static async goalManager(html, data) {
    let conflictGoal = html.find("#conflict_goal")[0].value;
    let goalData = {
      action: "setGoal",
      combat: data.combat._id,
      goal: conflictGoal,
      team: data.team
    };
    if (game.user.isGM) {
      this.setGoal(goalData);
    } else {
      await game.socket.emit("system.mouseguard", goalData);
    }
  }
  static async setGoal(data) {
    if (game.user.isGM) {
      let combat = await game.combats.get(data.combat);
      combat.setGoal(data.goal, data.team);
    }
  }
  static async askMoves(data) {
    let dlg = await renderTemplate("systems/mouseguard/templates/parts/conflict-move-manager.hbs", data);
    new Dialog({
      title: `Conflict Manager`,
      content: dlg,
      buttons: {
        ok: {
          label: game.i18n.localize("MOUSEGUARD.Send"),
          callback: async (html) => {
            let error = false;
            let Move1Actor = html.find("#move0-actor")[0].value;
            let Move1Move = html.find(".move0:checked").val();
            let Move2Actor = html.find("#move1-actor")[0].value;
            let Move2Move = html.find(".move1:checked").val();
            let Move3Actor = html.find("#move2-actor")[0].value;
            let Move3Move = html.find(".move2:checked").val();
            let CombatantData = {
              [Move1Actor]: [],
              [Move2Actor]: [],
              [Move3Actor]: []
            };
            if (!!Move1Move == false)
              error = true;
            if (!!Move2Move == false)
              error = true;
            if (!!Move3Move == false)
              error = true;
            if (error) {
              ui.notifications.error("An error occured while setting your moves. Please select new moves.");
              this.askMoves(data);
              return;
            }
            CombatantData[Move1Actor].push({
              id: randomID(),
              move: Move1Move,
              combatant: Move1Actor
            });
            CombatantData[Move2Actor].push({
              id: randomID(),
              move: Move2Move,
              combatant: Move2Actor
            });
            CombatantData[Move3Actor].push({
              id: randomID(),
              move: Move3Move,
              combatant: Move3Actor
            });
            let moveData = {
              action: "setMoves",
              combat: data.combat,
              data: CombatantData
            };
            if (game.user.isGM) {
              moveData.combat = data.combat;
              this.setMoves(moveData);
            } else {
              await game.socket.emit("system.mouseguard", moveData);
            }
          }
        },
        cancel: {
          label: "Cancel"
        }
      },
      default: "ok"
    }).render(true);
  }
  static async moveManger(html, data) {
  }
  static async setMoves(data) {
    if (game.user.isGM) {
      let combat = await game.combats.get(data.combat._id);
      let x = Object.keys(data.data).length;
      for (const key of Object.keys(data.data)) {
        let combatant = await combat.combatants.get(key);
        await combatant.setFlag("mouseguard", "Moves", data.data[key]);
      }
    }
  }
};

// module/mouse-combat.js
var MouseCombat = class extends Combat {
  constructor(object = {}, options = {}) {
    super(object, options);
  }
  getData() {
    const context = super.getData();
    return context;
  }
  get getGoal1() {
    return this.getFlag("mouseguard", "goal1");
  }
  get getGoal2() {
    return this.getFlag("mouseguard", "goal2");
  }
  get getConflictCaptain() {
    return this.getFlag("mouseguard", "ConflictCaptain");
  }
  get getConflictCaptainTeam2() {
    return this.getFlag("mouseguard", "ConflictCaptain2");
  }
  async setConflictCaptain(value) {
    return this.setFlag("mouseguard", "ConflictCaptain", value);
  }
  async setConflictCaptainTeam2(value) {
    return this.setFlag("mouseguard", "ConflictCaptain2", value);
  }
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);
    this.updateSource({
      flags: {
        mouseguard: {
          ConflictCaptain: null,
          ConflictCaptain2: null,
          goal1: null,
          goal2: null,
          team1Move: null,
          team2Move: null
        }
      }
    });
  }
  static _canUpdate(user, doc, data) {
    if (user.isGM)
      return true;
    const updateKeys = new Set(Object.keys(data));
    const allowedKeys = new Set(["_id", "initiative", "flags"]);
    return updateKeys.isSubset(allowedKeys);
  }
  async startCombat() {
    let goal = this.flags.mouseguard.goal1;
    let goal2 = this.flags.mouseguard.goal2;
    let CC = this.flags.mouseguard.ConflictCaptain;
    let CC2 = this.flags.mouseguard.ConflictCaptain2;
    if (!CC) {
      ui.notifications.error(game.i18n.localize("COMBAT.NeedCC"));
      return false;
    }
    if (goal == null) {
      ui.notifications.error(game.i18n.localize("COMBAT.NeedGoal"));
      this.askGoal();
      return false;
    }
    if (goal2 == null) {
      ui.notifications.error(game.i18n.localize("COMBAT.NeedGoal"));
      this.askGoal();
      return false;
    }
    if (!!goal != false && !!goal2 != false && CC && CC2) {
      this.askMove();
      return this.update({ round: 1, turn: 0 });
    }
    return false;
  }
  getCCPlayerByID(conflictCaptainID) {
    let combatant = this.combatants.get(conflictCaptainID);
    let actor = game.actors.get(combatant.actorId);
    return game.users.filter((u) => !u.isGM && actor.testUserPermission(u, "OWNER"))?.[0] ?? game.users.activeGM;
  }
  async askGoal() {
    let CC = this.flags.mouseguard.ConflictCaptain;
    let CC2 = this.flags.mouseguard.ConflictCaptain2;
    if (!CC) {
      ui.notifications.error("A Conflict Captain Must be set for team 1");
      return false;
    }
    if (!CC2) {
      ui.notifications.error("A Conflict Captain Must be set for team 2");
      return false;
    }
    let player = this.getCCPlayerByID(CC);
    await game.socket.emit("system.mouseguard", { action: "askGoal", combat: this, team: "1" }, { recipients: [player._id] });
    let player2 = this.getCCPlayerByID(CC2);
    await game.socket.emit("system.mouseguard", { action: "askGoal", combat: this, team: "2" }, { recipients: [player2._id] });
  }
  async setGoal(goal, team) {
    this.setFlag("mouseguard", "goal" + team, goal).then((content) => {
      this.startCombat();
    });
    return true;
  }
  async askMove() {
    let CC = this.flags.mouseguard.ConflictCaptain;
    let CC2 = this.flags.mouseguard.ConflictCaptain2;
    if (!CC) {
      ui.notifications.error(game.i18n.localize("COMBAT.NeedCC"));
      return false;
    }
    let data = { combat: this };
    let team1 = [];
    let team2 = [];
    let combatants = this.combatants.filter((comb) => comb.team == "1");
    Object.keys(combatants).forEach((key) => {
      team1.push({
        combatant: combatants[key].id,
        name: combatants[key].token.name
      });
    });
    data.actors = team1;
    data.action = "askMoves";
    let player = this.getCCPlayerByID(CC);
    await game.socket.emit("system.mouseguard", data, {
      recipients: [player._id]
    });
    let player2 = this.getCCPlayerByID(CC2);
    if (player2 == "undefined") {
      data.npc = true;
    }
    let team2combatants = this.combatants.filter((comb) => comb.team == "2");
    Object.keys(team2combatants).forEach((key) => {
      team2.push({
        combatant: team2combatants[key].id,
        name: team2combatants[key].token.name
      });
    });
    data.actors = team2;
    await game.socket.emit("system.mouseguard", data, {
      recipients: [player2._id]
    });
  }
  async askNPCMove(data) {
    MouseSocket.askMoves(data);
  }
  async nextRound() {
    this.askMove();
    super.nextRound();
  }
};

// module/mouse-combat-tracker.js
var MouseCombatTracker = class extends CombatTracker {
  constructor(options) {
    super(options);
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "combat",
      template: "systems/mouseguard/templates/sidebar/combat-tracker.html",
      title: "COMBAT.SidebarTitle",
      scrollY: [".directory-list"],
      dragDrop: [
        {
          dragSelector: "li.combatant.actor.directory-item.flexrow",
          dropSelector: "li[data-team]"
        }
      ]
    });
  }
  _canDragStart(ev) {
    if (game.user.isGM)
      return true;
    return false;
  }
  _canDragDrop(ev) {
    if (game.user.isGM)
      return true;
    return false;
  }
  _onDragDrop(ev) {
    super._onDrop(ev);
  }
  async _onDrop(ev) {
    super._onDrop(ev);
    if (JSON.parse(ev.dataTransfer?.getData("text/plain")).id == "0") {
      return false;
    }
    let dropped_id = JSON.parse(ev.dataTransfer?.getData("text/plain")).id;
    let target = ev.target.closest("li").dataset.team;
    await this.viewed.combatants.get(dropped_id).setTeam(target);
  }
  _onDragStart(ev) {
    let valid = this.viewed.combatants.get(ev.target.dataset.combatantId);
    if (valid.flags.mouseguard.ConflictCaptain) {
      ui.notifications.error(game.i18n.localize("COMBAT.CCERROR"));
      ev.dataTransfer.setData("text/plain", JSON.stringify({
        id: "0"
      }));
      return false;
    } else {
      ev.dataTransfer.setData("text/plain", JSON.stringify({ id: ev.target.dataset.combatantId }));
    }
  }
  _getEntryContextOptions() {
    return [
      {
        name: "COMBAT.ConflictCaptain",
        icon: '<i class="fas fa-crown"></i>',
        callback: (li) => {
          const combatant = this.viewed.combatants.get(li.data("combatant-id"));
          let Team = "";
          if (combatant.team == 2)
            Team = "2";
          if (combatant.team == 0)
            return;
          console.log(Team);
          if (this.viewed.flags.mouseguard["ConflictCaptain" + Team] == combatant.id) {
            this.viewed.setFlag("mouseguard", "ConflictCaptain" + Team, NaN);
            return combatant.setFlag("mouseguard", "ConflictCaptain", false);
          }
          if (!!this.viewed.flags.mouseguard["ConflictCaptain" + Team] == false) {
            if (combatant) {
              this.viewed.setFlag("mouseguard", "ConflictCaptain" + Team, li.data("combatant-id"));
              return combatant.setFlag("mouseguard", "ConflictCaptain", true);
            }
          } else {
            ui.notifications.error(game.i18n.localize("COMBAT.CCSet"));
            return false;
          }
          console.log(this);
        }
      },
      {
        name: "COMBAT.CombatantUpdate",
        icon: '<i class="fas fa-edit"></i>',
        callback: this._onConfigureCombatant.bind(this)
      },
      {
        name: "COMBAT.CombatantRemove",
        icon: '<i class="fas fa-trash"></i>',
        callback: (li) => {
          const combatant = this.viewed.combatants.get(li.data("combatant-id"));
          if (combatant)
            return combatant.delete();
        }
      }
    ];
  }
  async _onCombatantControl(event) {
    event.preventDefault();
    event.stopPropagation();
    const btn = event.currentTarget;
    const li = btn.closest(".combatant");
    const combat = this.viewed;
    const c = combat.combatants.get(li.dataset.combatantId);
    switch (btn.dataset.control) {
      case "doMove":
        return c.doMove(btn.dataset.move);
      case "toggleHidden":
        return c.update({ hidden: !c.hidden });
      case "toggleDefeated":
        return this._onToggleDefeatedStatus(c);
      case "rollInitiative":
        return combat.rollInitiative([c.id]);
      case "pingCombatant":
        return this._onPingCombatant(c);
    }
  }
  async getData(options) {
    let context = await super.getData(options);
    if (context.combat) {
      for (let [i, combatant] of context.combat.turns.entries()) {
        context.turns[i].flags = combatant.flags;
        context.turns[i].isFirstOwner = this.isFirstOwner(combatant.actor);
        context.turns[i].hasPlayerOwner = this.hasPlayerOwner(combatant.actor);
      }
    }
    return context;
  }
  firstOwner(doc) {
    if (!doc)
      return false;
    const gmOwners = Object.entries(doc.ownership).filter(([id, level]) => game.users.get(id)?.isGM && game.users.get(id)?.active && level === 3).map(([id, level]) => id);
    const otherOwners = Object.entries(doc.ownership).filter(([id, level]) => !game.users.get(id)?.isGM && game.users.get(id)?.active && level === 3).map(([id, level]) => id);
    if (otherOwners.length > 0)
      return game.users.get(otherOwners[0]);
    else
      return game.users.get(gmOwners[0]);
  }
  isFirstOwner(doc) {
    return game.user.id === this.firstOwner(doc).id;
  }
  hasPlayerOwner(doc) {
    if (!doc)
      return false;
    const gmOwners = Object.entries(doc.ownership).filter(([id, level]) => game.users.get(id)?.isGM && game.users.get(id)?.active && level === 3).map(([id, level]) => id);
    const otherOwners = Object.entries(doc.ownership).filter(([id, level]) => !game.users.get(id)?.isGM && game.users.get(id)?.active && level === 3).map(([id, level]) => id);
    if (otherOwners.length > 0)
      return true;
    else
      return false;
  }
};

// module/mouse-effects.js
var EffectsPanel = class extends Application {
  constructor(...args) {
    super(...args);
  }
  refresh = foundry.utils.debounce(this.render, 100);
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      ...super.defaultOptions,
      id: "mouseguard-effects-panel",
      popOut: false,
      classes: ["mouseguard"],
      template: "systems/mouseguard/templates/effects/effects-panel.hbs"
    });
  }
  get token() {
    return canvas.tokens.controlled.at(0)?.document ?? null;
  }
  get actor() {
    return this.token?.actor ?? game.user?.character ?? null;
  }
  async getData() {
    let currentStatus = [];
    const { actor } = this;
    if (actor == null)
      return;
    const { token } = this;
    currentStatus = Array.from(actor.statuses);
    return { currentStatus };
  }
  async refresh(force) {
    return foundry.utils.debounce(this.render.bind(this, force), 100)();
  }
};

// module/svelte/MouseGuardConflictManager.svelte
var MouseGuardConflictManager = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, null, safe_not_equal, {});
  }
};
var MouseGuardConflictManager_default = MouseGuardConflictManager;

// module/mouse-conflict-manager.js
var MouseConflictManager = class extends Application {
  constructor(...args) {
    super(...args);
  }
  app = null;
  dataStore = null;
  refresh = foundry.utils.debounce(this.render, 100);
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      ...super.defaultOptions,
      id: "mouseguard-conflict-panel",
      classes: ["mouseguard"],
      template: "systems/mouseguard/templates/actor-sheetv2.html",
      width: 850,
      height: 600
    });
  }
  render(force = false, options = {}) {
    let sheetData = this.getData();
    if (this.app !== null) {
      let states = Application.RENDER_STATES;
      if (this._state == states.RENDERING || this._state == states.RENDERED) {
        this.dataStore?.set(sheetData);
        return;
      }
    }
    this._render(force, options).catch((err) => {
      err.message = `An error occurred while rendering ${this.constructor.name} ${this.appId}: ${err.message}`;
      console.error(err);
      this._state = Application.RENDER_STATES.ERROR;
    }).then((rendered) => {
      this.dataStore = writable(sheetData);
      this.app = new MouseGuardConflictManager_default({
        target: this.element.find("form").get(0),
        props: {
          dataStore: this.dataStore
        }
      });
    });
    return this;
  }
  close(options = {}) {
    if (this.app != null) {
      this.app.$destroy();
      this.app = null;
      this.dataStore = null;
    }
    return super.close(options);
  }
};

// module/status-effects.js
var statusEffects = [
  {
    id: "sick",
    label: "MOUSEGUARD.sick",
    icon: "systems/mouseguard/assets/icons/sick.svg"
  },
  {
    id: "tired",
    label: "MOUSEGUARD.tired",
    icon: "systems/mouseguard/assets/icons/tired.svg"
  },
  {
    id: "hungthurst",
    label: "MOUSEGUARD.hungthurst",
    icon: "systems/mouseguard/assets/icons/hungthurst.svg"
  },
  {
    id: "injured",
    label: "MOUSEGUARD.injured",
    icon: "systems/mouseguard/assets/icons/injured.svg"
  },
  {
    id: "angry",
    label: "MOUSEGUARD.angry",
    icon: "systems/mouseguard/assets/icons/angry.svg"
  }
];

// module/mouseguard.js
Hooks.once("init", async function() {
  console.log(`Initializing MouseGuard MouseGuard System`);
  let RollCount = 0;
  let RollMessage = "";
  game.mouseguard = {
    MouseGuardActor,
    createMouseGuardMacro,
    RollCount,
    RollMessage,
    updateDisplay,
    MouseDie,
    MouseRoll,
    effectPanel: new EffectsPanel()
  };
  CONFIG.Actor.documentClass = MouseGuardActor;
  CONFIG.Item.documentClass = MouseGuardItem;
  CONFIG.Dice.rolls.push(MouseRoll);
  CONFIG.Combatant.documentClass = MouseCombatant;
  CONFIG.Combat.documentClass = MouseCombat;
  CONFIG.ui.combat = MouseCombatTracker;
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("mouseguard", MouseGuardNPCActorSheet, {
    types: ["mouse", "weasel", "animal"],
    makeDefault: true
  });
  console.log("Setting actor Sheet");
  Actors.registerSheet("mouseguard", MouseGuardActorSheet, {
    types: ["character"],
    makeDefault: true
  });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("mouseguard", MouseGuardItemSheet, {
    makeDefault: true
  });
  Handlebars.registerHelper("slugify", function(value) {
    return value.slugify({ strict: true });
  });
  await preloadHandlebarsTemplates();
});
Hooks.once("init", async function() {
  CONFIG.Dice.terms["m"] = MouseDie;
  CONFIG.Dice.terms["6"] = MouseDie;
  game.socket.on("system.mouseguard", (data) => {
    if (data.action === "askGoal")
      MouseSocket.askGoal(data);
    if (data.action === "setGoal")
      MouseSocket.setGoal(data);
    if (data.action === "askMoves")
      MouseSocket.askMoves(data);
    if (data.action === "setMoves")
      MouseSocket.setMoves(data);
  });
  await registerTours();
});
Hooks.once("diceSoNiceReady", (dice3d) => {
  let dicetheme = "mouseguard";
  if (!dicetheme || dicetheme == "mouseguard") {
    dice3d.addSystem({ id: "mouseguard", name: "Mouse Guard" }, true);
    dice3d.addDicePreset({
      type: "dm",
      labels: [
        "systems/mouseguard/assets/dice/snake.png",
        "systems/mouseguard/assets/dice/snake.png",
        "systems/mouseguard/assets/dice/snake.png",
        "systems/mouseguard/assets/dice/sword.png",
        "systems/mouseguard/assets/dice/sword.png",
        "systems/mouseguard/assets/dice/axe.png"
      ],
      colorset: "white",
      system: "mouseguard"
    }, "d6");
  }
  dice3d.addColorset({
    name: "white-mg",
    description: "Mouse Guard white",
    category: "Colors",
    foreground: "#000000",
    background: "#ffffff",
    outline: "black",
    texture: "none",
    material: "plastic"
  });
});
Hooks.on("renderSidebarTab", (app, html, data) => {
  const template = "./systems/mouseguard/templates/mousetray.html";
  let $chat_form = html.find("#chat-form");
  renderTemplate(template).then((c) => {
    let $content = $(c);
    $chat_form.after($content);
    $content.find(".mouse_dice_button").on("click", (event) => {
      event.preventDefault();
      if (event.currentTarget.classList.contains("add")) {
        game.mouseguard.RollCount++;
      } else {
        game.mouseguard.RollCount--;
      }
      if (game.mouseguard.RollCount < 1)
        game.mouseguard.RollCount = 0;
      updateDisplay(game.mouseguard.RollCount);
    });
    $content.find(".mouse_roll_button").on("click", (event) => {
      event.preventDefault();
      let $self = $(event.currentTarget);
      let dataset = event.currentTarget.dataset;
      if (game.mouseguard.RollCount > 0) {
        let actor = game.user.character ?? canvas.tokens.controlled[0]?.actor;
        var roll = new MouseRoll(game.mouseguard.RollCount + "dmcs>3");
        roll.evaluate({ async: true });
        roll.toMessage({
          user: game.user.id,
          flavor: game.mouseguard.RollMessage,
          speaker: ChatMessage.getSpeaker({ actor })
        });
        game.mouseguard.RollCount = 0;
        game.mouseguard.RollMessage = "";
        updateDisplay(0);
      }
    });
    updateDisplay(game.mouseguard.RollCount);
  });
});
Hooks.once("ready", async () => {
  let tourRolls = game.user.getFlag("mouseguard", "tourRolls");
  if (tourRolls == void 0) {
    const tour = game.tours.get("mouseguard.welcome");
    tour.start();
    game.user.setFlag("mouseguard", "tourRolls", 1);
  }
  Hooks.on("controlToken", game.mouseguard.effectPanel.refresh.bind(game.mouseguard.effectPanel, true));
  for (const hook of [
    "createActiveEffect",
    "updateActiveEffect",
    "deleteActiveEffect"
  ]) {
    Hooks.on(hook, function(effect) {
      if (effect.parent === game.mouseguard.effectPanel.actor)
        game.mouseguard.effectPanel.refresh(true);
    });
  }
});
Hooks.on("renderChatMessage", (chatMessage, [html], messageData) => {
  if (messageData.message.flags?.mouseguard?.unflipped) {
    html.querySelector("img").src = "systems/mouseguard/assets/deck/CardBack.webp";
    if (game.user.isGM) {
      html.querySelector(".action-move").insertAdjacentHTML("beforeend", ' <button id="reveal-button" type="button">Reveal Card</button> ');
      html.querySelector("#reveal-button").addEventListener("click", (event) => {
        let message = game.messages.get(event.target.closest("li").dataset.messageId);
        message.setFlag("mouseguard", "unflipped", false);
      });
    }
  }
});
Hooks.on("canvasReady", () => {
  game.mouseguard.effectPanel.render(true);
});
Hooks.once("setup", () => {
  CONFIG.statusEffects = statusEffects;
});
async function registerTours() {
  try {
    game.tours.register("mouseguard", "welcome", await SidebarTour.fromJSON("/systems/mouseguard/tours/welcome.json"));
  } catch (err) {
    console.error(err);
  }
}
function updateDisplay(count) {
  let diceHTML = '<li class="roll mousedie d6"><img src="systems/mouseguard/assets/dice/sword.png" height="24" width="24"></li>';
  let theHTML = "";
  for (let i = 0; i < count; i++) {
    theHTML += diceHTML;
  }
  $(".mouse-dice-roll").html(theHTML);
  $(".mouse_dice_button.subtract").prop("disabled", !count);
  $(".mouse_roll_button").prop("disabled", !count);
}
Handlebars.registerHelper("times", function(n, block) {
  var accum = "";
  for (var i = 0; i < n; ++i)
    accum += block.fn(i);
  return accum;
});
Handlebars.registerHelper("concat", function() {
  var outStr = "";
  for (var arg in arguments) {
    if (typeof arguments[arg] != "object") {
      outStr += arguments[arg];
    }
  }
  return outStr;
});
Handlebars.registerHelper("ifEquals", function(arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
//# sourceMappingURL=mouseguard.js.map
