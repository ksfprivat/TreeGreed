var treeGrid;
var toolBar;
var filterForm;
var dataSource;

function initDataSource() {
    console.log("Initialization data source...");
    dataSource = DataSource.create({
        fields: [
            {name: "id", title: "id", primaryKey: true},
            {name: "title", title:"Наименование"},
            {name: "search"}
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

    toolBar = HLayout.create({
        layoutMargin:   5,
        membersMargin:  5,
        members: [
            Button.create({title: "Add", click: onBtnAddClick}),
            Button.create({title: "Delete", click: onBtnDelClick})
        ]
    });

    filterForm = DynamicForm.create(
        {
            numRows: 0,
            autoDraw: false,
            items: [
                {type: "text", name: "filterEdit", title: "Filter"}
            ],
            keyUp: onFilterApply
        }
    );

    VLayout.create({
        layoutMargin:   5,
        membersMargin:  5,
        width: "300",
        height: "240",
        members: [
            filterForm,
            treeGrid,
            toolBar
        ]
    });
}

function onFilterApply() {
    var filter = filterForm.getValue("filterEdit");
    if (filter !== null && filter !== undefined) {
        console.log(filter);
        treeGrid.filterData({title: filter, search: "true"});
    } else {
        treeGrid.clearCriteria();
    }

}


function unloadNode(parent) {
    console.log("unloadNode");
    for (var i = 0; i < parent.children.length; i++)
        dataSource.removeData({id: parent.id + "_"+i});
}


function onTreeViewOpenFolder(node) {
    console.log(node);

    switch (node.type) {
        case "customer":
            if (node.children.length == 0) {
                dataSource.addData({parentId: node.id, id: node.id+"_0", title: "Контакты", type: "contact", search: false});
                dataSource.addData({parentId: node.id, id: node.id+"_1", title: "Контракты", type: "contract", search: false});
            }
            break;
        case "contact":
            unloadNode(node);
            for (var i = 0; i < contacts.length; i++) {
                dataSource.addData({parentId: node.id, id: node.id+"_"+i, title: contacts[i].title, isFolder: false, search: true} );
            }
            break;
    }
    treeGrid.getData().openFolder(node);
}

function onNodeClick() {
    console.log("Node clicked2");
}

function onBtnAddClick() {
    console.log("Add");
    console.log(dataSource.cacheData);
 }

function onBtnDelClick() {
    console.log("Delete");

}
