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
    dataSource.removeData({id:parent+"_0"});
    dataSource.removeData({id:parent+"_1"});
}


function onTreeViewOpenFolder(node) {
    console.log(node);


    switch (node.type) {
        case "customer":
            unloadNode(node.id);
            dataSource.addData({parentId: node.id, id: node.id+"_0", title: "Контакты", type: "contactsFolder"});
            dataSource.addData({parentId: node.id, id: node.id+"_1", title: "Контракты", type: "contractsFolder"});
            // for (var i = 0; i < contacts.length; i++) {
            //     dataSource.addData({parentId: node.id, id: contacts[i].id, title: contacts[i].title, isFolder: false});
            // }
            break;

        case "contactsFolder":
            console.log("This is Contacts");

            break;

        case "contractsFolder":
            console.log("This is contracts");
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
