import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css'

import  {Form,FormItem} from "element-ui";
Vue.use(Form);
Vue.use(FormItem);

import  {Button,ButtonGroup} from "element-ui";
Vue.use(Button);
Vue.use(ButtonGroup);

import {Input} from "element-ui";
Vue.use(Input);

import {Checkbox} from "element-ui";
Vue.use(Checkbox);

import {Card} from "element-ui";
Vue.use(Card);

import {Avatar} from "element-ui";
Vue.use(Avatar);

import {Cascader} from "element-ui";
Vue.use(Cascader);

import {Breadcrumb,BreadcrumbItem} from "element-ui";
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);

import {Row,Col} from "element-ui";
Vue.use(Row);
Vue.use(Col);

import {Table,TableColumn} from "element-ui";
Vue.use(Table);
Vue.use(TableColumn);

import {Select,Option,OptionGroup} from "element-ui";
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);

import {Dropdown,DropdownItem,DropdownMenu} from "element-ui";
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);

import {Menu,MenuItem,MenuItemGroup,Submenu} from "element-ui";
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);


import {Container,Aside,Header,Main} from "element-ui";
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);

import {Message,MessageBox,Loading,Notification} from "element-ui";
Vue.prototype.$message=Message;
// Vue.prototype.$confirm=MessageBox.confirm;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
// Vue.prototype.$message = packages_message;
// Vue.use(Message);
// Vue.use(MessageBox);