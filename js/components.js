Vue.component("v-tabs", {
        template: 
        `
        <div class="tabs">
            <ul>
                <draggable 
                    v-model="proxy_items" 
                    :options="{animation:150}" 
                    element="li" 
                    :no-transition-on-drag="true"
                    @end="onEnd" >
                    <li 
                        v-for="(item, index) in proxy_items" 
                        :class="[ {'is-active': index == active }, {'expired': !item.enabled} ]"
                        @click="switchTab(index)" >
                        <a>{{ item.title }}</a>
                    </li>
                </draggable>
            </ul>
        </div>
        `,
        props: ["items", "active"],
        data: function () {
            return {
                "proxy_items": this.items
            }
        },
        methods: {
            switchTab: function (idx) {
                store.switchTab(idx);
            },
            onEnd: function (evt) {
                if (this.active == evt.oldIndex) {
                    store.switchTab(evt.newIndex);
                }

                store.sortPage(this.items, this.proxy_items);
            }
        }
    });

    Vue.component("v-act", {
        template: `
        <div class="columns">
            <div class="column">
                <div class="dropdown" :class="{ 'is-active': actions.open }">
                    <div class="dropdown-trigger">
                        <button @click="switchDropdown" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                            <span>添加模块</span>
                            <span class="icon is-small">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            <a href="#" class="dropdown-item" v-for="(item, key) in actions.data" @click="chooseModule(key)">{{ item.desc }}</a>
                        </div>
                    </div>
                </div>
                <button class="button is-primary" @click="openAll">{{ actions.collapse_all ? "展开全部":"折叠全部" }}</button>
                <button class="button is-danger" @click="deleteTab">删除页签</button>
                <button class="button is-warning" @click="saveConfig">保存配置</button>
            </div>
        </div>
        `,
        props: ["actions"],
        methods: {
            switchDropdown: function () {
                store.switchDropdown(!this.actions.open);
            },
            chooseModule: function (module) {
                console.log(module);
                store.switchDropdown(false);
                store.addModule(module);

            },
            openAll: function () {
                store.openAll();
            },
            deleteTab: function () {
                // TODO
                if (confirm("删除页签，会删除此页签的所有配置。确定继续？")) {
                    store.deleteTab();
                }
            },
            saveConfig: function () {
                store.saveConfig();
            }
        }
    });

    Vue.component("v-module-basic", {
        template: 
        `
        <div class="card">
            <header class="card-header" :class="{ 'expired': !info.enabled }">
                <p class="card-header-title">
                    {{ info.data.title }}
                </p>
                <span class="card-header-icon" aria-label="more options">
                    <span class="icon" @click="info.state.collapse = !info.state.collapse" v-show="!info.state.collapse">
                        <i class="fa fa-envelope-open" aria-hidden="true"></i>
                    </span>
                    <span class="icon" @click="info.state.collapse = !info.state.collapse" v-show="info.state.collapse">
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                    <span class="icon" title="删除模块,危险">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </span>
                </span>
            </header>
            <div class="card-content" v-show="!info.state.collapse">
                <div class="columns">
                    <div class="column is-two-fifths">
                        <div class="field is-horizontal">
                            <div class="field-label">
                                <label class="label">文案</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <p class="control">
                                        <input class="input" v-model="info.data.title" type="email" placeholder="标题文案">
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-two-fifths">
                        <div class="field is-horizontal">
                            <div class="field-label">
                                <label class="label">地址</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <p class="control">
                                        <input class="input" v-model="info.data.url" type="email" placeholder="跳转链接">
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `,
        props: ["info"],
        methods: {

        }
    });