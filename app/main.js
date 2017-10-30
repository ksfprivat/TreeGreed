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



    // treeGrid.setDataSource(dataSource);
    // dataSource.addData(customers);


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

function onTreeViewOpenFolder(node) {
    console.log(node);

    if (node.type == "customer") {
        dataSource.addData(contacts);
        dataSource.addData({parentId: node.id, title: "Контакты"});
        dataSource.addData({parentId: node.id, title: "Контракты"});
    }

    treeGrid.getData().openFolder(node);
}

function onNodeClick() {
    console.log("Node clicked2");
}

function onBtnAddClick() {
    // dataSource.addData({id: 77, parentId: 1, title: "Acronis"});

    ///dataSource.addData(customers);
    // console.log(dataSource.cacheData);

}

function onBtnDelClick() {
    console.log("Delete");
}
