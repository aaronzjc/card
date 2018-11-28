window.store = {
        state: {
            "drag": false,

            // 页面基础信息
            "page_info": {},

            // 页面按钮状态等
            "page_state": {
                "active": 0,
            },

            // 整个页面的数据结构
            "page_data": [
                {
                    "title": "第一集",
                    "enabled": true,
                    "modules": [
                        {
                            "id": 1,
                            "module_type": "v-module-basic",
                            "enabled": false,
                            "data": {
                                "title": "基础模块",
                                "url": "http://www.baidu.com",
                            },
                            "state": {
                                "collapse": false
                            }
                        }
                    ]
                },
                {
                    "title": "第二集",
                    "enabled": true,
                    "modules": []
                },
                {
                    "title": "第三集",
                    "enabled": true,
                    "modules": []
                },
                {
                    "title": "第四集",
                    "enabled": false,
                    "modules": []
                },
                {
                    "title": "第五集",
                    "enabled": true,
                    "modules": []
                },
                {
                    "title": "第六集",
                    "enabled": true,
                    "modules": []
                },
                {
                    "title": "第七集",
                    "enabled": true,
                    "modules": []
                },
                {
                    "title": "第八集",
                    "enabled": true,
                    "modules": []
                },
                {
                    "title": "第九集",
                    "enabled": true,
                    "modules": []
                }
            ],

            // 页面的备份数据，误操作，还原用的
            "page_bak": null,

            // 页面动作
            "page_action": {
                "open": false,
                "data": {
                    "basic_module": {
                        "id": null,
                        "module_type": "v-module-basic",
                        "desc": "基础信息模块",
                        "enabled": true,
                        "data": {
                            "title": "基础模块",
                            "url": "http://www.baidu.com",
                        },
                        "state": {
                            "collapse": false
                        }
                    }
                },
                "collapse_all": false
            }
        },

        switchTab: function(idx) {
            this.state.page_state.active = idx;
        },

        switchDropdown: function (st) {
            this.state.page_action.open = st;
        },

        openAll: function () {
            var i = 0;
            var st = this.state;
            st.page_action.collapse_all = !st.page_action.collapse_all;
            for (;i<st.page_data[st.page_state.active].modules.length;i++) {
                st.page_data[st.page_state.active].modules[i].state.collapse = st.page_action.collapse_all;
            }
        },

        addTab: function () {
            this.state.page_data.unshift({
                "title": "默认文案",
                "enabled": false,
                "modules": []
            });
            this.switchTab(0);
        },

        addModule: function (module) {
            var st = this.state;
            if (st.page_action["data"][module]) {
                var obj = JSON.parse(JSON.stringify(st.page_action["data"][module]));
                obj["id"] = st.page_data[st.page_state.active].modules.length + 1;
                st.page_data[st.page_state.active].modules.push(obj);
            }
            st.drag = false;
        },

        sortPage: function (oldPage, newPage) {
            this.state.page_data = newPage;
            this.state.page_bak = oldPage;
        },

        deleteTab: function () {
            this.state.page_data.splice(this.state.page_state.active, 1);
            this.switchTab(0)
        },

        saveConfig: function () {
            console.log(this.state.page_data);
        }

    };