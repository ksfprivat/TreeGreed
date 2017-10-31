var treeGrid;
var toolBar;
var dataSource;

function initDataSource() {
    console.log("Initialization data source...");
    dataSource = DataSource.create({
        fields: [
            {name: "id", title: "id", primaryKey: true},
            {name: "title", title:"Наименование"}
            ],
        clientOnly: true,
        cacheData: customers
    });
 }

function createLayout() {
    console.log("Application init...");
    initDataSource();
    treeGrid = TreeGrid.create({
        width: "100%",
        height: "100%",
        dataSource: dataSource,
        fields: [{name:"title", title:"Наименование"}],
        autoFetchData: true,
        loadDataOnDemand: false,
        alwaysShowOpener: true,
        openFolder: onTreeViewOpenFolder,
        dataProperties:{
             defaultIsFolder:true
        }
    });


    // var treeData = Tree.create({ID: "treeData", data: customers});
    // treeGrid.setData(treeData);

    toolBar = HLayout.create({
        layoutMargin:   5,
        membersMargin:  5,
        members: [
            Button.create({title: "Add", click: onBtnAddClick}),
            Button.create({title: "Delete", click: onBtnDelClick})
        ]
    });

    VLayout.create({
        layoutMargin:   5,
        membersMargin:  5,
        width: "300",
        height: "240",
        members: [
            treeGrid,
            toolBar
        ]
    });
}

function unloadNode(parent) {
    if (parent.children != "") {
        dataSource.removeData({id: parent.id + "_contacts"});
        dataSource.removeData({id: parent.id + "_contracts"});
    }
}


function onTreeViewOpenFolder(node) {
    console.log(node);


    switch (node.type) {
        case "customer":
            unloadNode(node);
            dataSource.addData({parentId: node.id, id: node.id+"_contacts", title: "Контакты", type: "contact"});
            dataSource.addData({parentId: node.id, id: node.id+"_contracts", title: "Контракты", type: "contract"});
            // for (var i = 0; i < contacts.length; i++) {
            //     dataSource.addData({parentId: node.id, id: contacts[i].id, title: contacts[i].title, isFolder: false});
            // }
            break;
        case "contact":
            console.log("This is contacts");
            for (var i = 0; i < contacts.length; i++) {
                dataSource.addData({parentId: node.id, title: contacts[i].title, isFolder: false});
            }
            break;
    }
    treeGrid.getData().openFolder(node);
}

function onNodeClick() {
    console.log("Node clicked2");
}

function onBtnAddClick() {
    // var treeData = Tree.create({ID:"treeData", data: dataSource.cacheData});
    // console.log(treeData);
    // treeGrid.setData(treeData);
}

function onBtnDelClick() {
    // console.log("Delete");
    dataSource.removeData({id:"0_0"});
    dataSource.removeData({id:"0_1"});
}
