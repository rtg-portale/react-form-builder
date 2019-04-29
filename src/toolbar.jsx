/**
 * <Toolbar />
 */

import React from 'react';
import translate from 'counterpart';
import ToolbarItem from './toolbar-draggable-item';
import ID from './UUID';
import store from './stores/store';

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    const items = this.props.items ? this.props.items : this._defaultItems();
    this.state = {
      items,
    };
    store.subscribe(state => this.setState({ store: state }));
  }

  static _defaultItemOptions(element) {
    switch (element) {
      case 'Dropdown':
        return [...Array(3).keys()].map(n => ({
          value: translate('form.placeholder-value-x', { number: n + 1 }),
          text: translate('form.placeholder-option-x', { number: n + 1 }),
          key: `dropdown_option_${ID.uuid()}`,
        }));
      case 'Tags':
        return [...Array(3).keys()].map(n => ({
          value: translate('form.placeholder-value-x', { number: n + 1 }),
          text: translate('form.placeholder-tag-x', { number: n + 1 }),
          key: `tags_option_${ID.uuid()}`,
        }));
      case 'Checkboxes':
        return [...Array(3).keys()].map(n => ({
          value: translate('form.placeholder-value-x', { number: n + 1 }),
          text: translate('form.placeholder-option-x', { number: n + 1 }),
          key: `checkboxes_option_${ID.uuid()}`,
        }));
      case 'RadioButtons':
        return [...Array(3).keys()].map(n => ({
          value: translate('form.placeholder-value-x', { number: n + 1 }),
          text: translate('form.placeholder-option-x', { number: n + 1 }),
          key: `radiobuttons_option_${ID.uuid()}`,
        }));
      default:
        return [];
    }
  }

  _defaultItems() {
    return [
      {
        key: 'Header',
        name: translate('toolbar.header-text'),
        icon: 'fa fa-header',
        static: true,
        content: translate('form.placeholder-text'),
      },
      {
        key: 'Label',
        name: translate('toolbar.label'),
        static: true,
        icon: 'fa fa-font',
        content: translate('form.placeholder-text'),
      },
      {
        key: 'Paragraph',
        name: translate('toolbar.paragraph'),
        static: true,
        icon: 'fa fa-paragraph',
        content: translate('form.placeholder-text'),
      },
      {
        key: 'LineBreak',
        name: translate('toolbar.line-break'),
        static: true,
        icon: 'fa fa-arrows-h',
      },
      {
        key: 'Dropdown',
        canHaveAnswer: true,
        name: translate('toolbar.dropdown'),
        icon: 'fa fa-caret-square-o-down',
        label: translate('form.placeholder-label'),
        field_name: 'dropdown_',
        options: [],
      },
      {
        key: 'Tags',
        canHaveAnswer: true,
        name: translate('toolbar.tags'),
        icon: 'fa fa-tags',
        label: translate('form.placeholder-label'),
        field_name: 'tags_',
        options: [],
      },
      {
        key: 'Checkboxes',
        canHaveAnswer: true,
        name: translate('toolbar.checkboxes'),
        icon: 'fa fa-check-square-o',
        label: translate('form.placeholder-label'),
        field_name: 'checkboxes_',
        options: [],
      },
      {
        key: 'RadioButtons',
        canHaveAnswer: true,
        name: translate('toolbar.multiple-choice'),
        icon: 'fa fa-dot-circle-o',
        label: translate('form.placeholder-label'),
        field_name: 'radio_buttons_',
        options: [],
      },
      {
        key: 'TextInput',
        canHaveAnswer: true,
        name: translate('toolbar.text-input'),
        label: translate('form.placeholder-label'),
        icon: 'fa fa-font',
        field_name: 'text_input_',
      },
      {
        key: 'TextArea',
        canHaveAnswer: true,
        name: translate('toolbar.multi-line-input'),
        label: translate('form.placeholder-label'),
        icon: 'fa fa-text-height',
        field_name: 'text_area_',
      },
      {
        key: 'NumberInput',
        canHaveAnswer: true,
        name: translate('toolbar.number-input'),
        label: translate('form.placeholder-label'),
        icon: 'fa fa-plus',
        field_name: 'number_input_',
      },
      {
        key: 'Range',
        name: translate('toolbar.range'),
        icon: 'fa fa-sliders',
        label: translate('form.placeholder-label'),
        field_name: 'range_',
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: translate('form.placeholder-min'),
        max_label: translate('form.placeholder-max'),
      },
      {
        key: 'Rating',
        canHaveAnswer: true,
        name: translate('toolbar.rating'),
        label: translate('form.placeholder-label'),
        icon: 'fa fa-star',
        field_name: 'rating_',
      },
      {
        key: 'Image',
        name: translate('toolbar.image'),
        label: '',
        icon: 'fa fa-photo',
        field_name: 'image_',
        src: '',
      },
      {
        key: 'Download',
        name: translate('toolbar.file-attachment'),
        icon: 'fa fa-file',
        static: true,
        content: translate('form.placeholder-file'),
        field_name: 'download_',
        file_path: '',
        _href: '',
      },
      {
        key: 'Camera',
        name: translate('toolbar.camera'),
        icon: 'fa fa-camera',
        label: translate('form.placeholder-label'),
        field_name: 'camera_',
      },
      {
        key: 'DatePicker',
        canDefaultToday: true,
        canReadOnly: true,
        name: translate('toolbar.date'),
        icon: 'fa fa-calendar',
        label: translate('form.placeholder-label'),
        field_name: 'date_picker_',
      },
      {
        key: 'HyperLink',
        name: translate('toolbar.web-site'),
        icon: 'fa fa-link',
        static: true,
        content: translate('form.placeholder-web-site'),
        href: translate('form.placeholder-href'),
      },
      {
        key: 'Signature',
        canReadOnly: true,
        name: translate('toolbar.signature'),
        icon: 'fa fa-pencil-square-o',
        label: translate('toolbar.signature'),
        field_name: 'signature_',
      },
    ];
  }

  create(item) {
    const elementOptions = {
      id: ID.uuid(),
      element: item.key,
      text: item.name,
      static: item.static,
      required: false,
    };

    if (item.static) {
      elementOptions.bold = false;
      elementOptions.italic = false;
    }

    if (item.canHaveAnswer) {
      elementOptions.canHaveAnswer = item.canHaveAnswer;
    }

    if (item.canReadOnly) {
      elementOptions.readOnly = false;
    }

    if (item.canDefaultToday) {
      elementOptions.defaultToday = false;
    }

    if (item.content) {
      elementOptions.content = item.content;
    }

    if (item.href) {
      elementOptions.href = item.href;
    }

    if (item.key === 'Image') {
      elementOptions.src = item.src;
    }

    if (item.key === 'Download') {
      elementOptions._href = item._href;
      elementOptions.file_path = item.file_path;
    }

    if (item.key === 'Range') {
      elementOptions.step = item.step;
      elementOptions.default_value = item.default_value;
      elementOptions.min_value = item.min_value;
      elementOptions.max_value = item.max_value;
      elementOptions.min_label = item.min_label;
      elementOptions.max_label = item.max_label;
    }

    if (item.defaultValue) {
      elementOptions.defaultValue = item.defaultValue;
    }

    if (item.field_name) {
      elementOptions.field_name = item.field_name + ID.uuid();
    }

    if (item.label) {
      elementOptions.label = item.label;
    }

    if (item.options) {
      elementOptions.options = Toolbar._defaultItemOptions(elementOptions.element);
    }

    return elementOptions;
  }

  _onClick(item) {
    // ElementActions.createElement(this.create(item));
    store.dispatch('create', this.create(item));
  }

  render() {
    return (
      <div className="react-form-builder-toolbar pull-right">
        <h4>{translate('toolbar.heading')}</h4>
        <ul>
          {this.state.items.map(item => (
            <ToolbarItem data={item} key={item.key} onClick={this._onClick.bind(this, item)} onCreate={this.create} />
          ))}
        </ul>
      </div>
    );
  }
}
