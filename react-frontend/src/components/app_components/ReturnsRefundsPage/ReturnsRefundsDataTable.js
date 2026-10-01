import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { InputNumber } from 'primereact/inputnumber';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";
import { Checkbox } from "primereact/checkbox";

const ReturnsRefundsDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user,   selectedDelete,
  setSelectedDelete, onCreateResult}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);
  const header = (
    <div
      className="table-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h5 className="m-0"></h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Keyword Search"
        />
      </span>
    </div>
  );

const editorRequestNumberTemplate0 = (rowData, { rowIndex }) => <div  dangerouslySetInnerHTML={{__html: rowData.requestNumber}}></div>
const dropdownArrayRequestTypeTemplate1 = (rowData, { rowIndex }) => <p >{rowData.requestType}</p>
const pOrderNumberOrderNumberTemplate2_0 = (rowData, { rowIndex }) => <p >{rowData.orderNumber?.orderNumber}</p>
const pProductNameProductNameTemplate3_0 = (rowData, { rowIndex }) => <p >{rowData.productName?.productName}</p>
const pCustomerNameCustomerNameTemplate4_0 = (rowData, { rowIndex }) => <p >{rowData.customerName?.customerName}</p>
const editorReasonTemplate5 = (rowData, { rowIndex }) => <div  dangerouslySetInnerHTML={{__html: rowData.reason}}></div>
const inputTextareaProductDetailTemplate6 = (rowData, { rowIndex }) => <p >{rowData.productDetail}</p>
const imagePhotosTemplate7 = (rowData, { rowIndex }) => <Image src={rowData.photos}  alt="Image" height="60px" />
const dropdownArrayConditonTemplate8 = (rowData, { rowIndex }) => <p >{rowData.conditon}</p>
const dropdownArrayStatusTemplate9 = (rowData, { rowIndex }) => <p >{rowData.status}</p>
const dropdownArrayRefundMethodTemplate10 = (rowData, { rowIndex }) => <p >{rowData.refundMethod}</p>
const currencyRefundAmountTemplate11 = (rowData, { rowIndex }) => <InputNumber tooltip="Use only numbers" value={rowData.refundAmount}  mode="currency" currency="MYR" locale="en-US" disabled={true} useGrouping={false} />
const editorRefundRefTemplate12 = (rowData, { rowIndex }) => <div  dangerouslySetInnerHTML={{__html: rowData.refundRef}}></div>
const p_dateDateReturnTemplate13 = (rowData, { rowIndex }) => <p >{moment(rowData.dateReturn).fromNow()}</p>
const p_dateRequestedAtTemplate14 = (rowData, { rowIndex }) => <p >{moment(rowData.requestedAt).fromNow()}</p>
const p_dateRefundedAtTemplate15 = (rowData, { rowIndex }) => <p >{moment(rowData.refundedAt).fromNow()}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
      const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };
    
  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

    return (
        <>
        <DataTable 
           value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
        globalFilter={globalFilter}
        header={header}
        >
                <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
<Column field="requestNumber" header="Request Number" body={editorRequestNumberTemplate0} filter={selectedFilterFields.includes("requestNumber")} hidden={selectedHideFields?.includes("requestNumber")}    style={{ minWidth: "8rem" }} />
<Column field="requestType" header="Request Type" body={dropdownArrayRequestTypeTemplate1} filter={selectedFilterFields.includes("requestType")} hidden={selectedHideFields?.includes("requestType")}    style={{ minWidth: "8rem" }} />
<Column field="orderNumber.orderNumber" header="Order Number" body={pOrderNumberOrderNumberTemplate2_0} style={{ minWidth: "8rem" }} />
<Column field="productName.productName" header="Product Name" body={pProductNameProductNameTemplate3_0} style={{ minWidth: "8rem" }} />
<Column field="customerName.customerName" header="Customer Name" body={pCustomerNameCustomerNameTemplate4_0} style={{ minWidth: "8rem" }} />
<Column field="reason" header="Reason" body={editorReasonTemplate5} filter={selectedFilterFields.includes("reason")} hidden={selectedHideFields?.includes("reason")}    style={{ minWidth: "8rem" }} />
<Column field="productDetail" header="Product Detail" body={inputTextareaProductDetailTemplate6} filter={selectedFilterFields.includes("productDetail")} hidden={selectedHideFields?.includes("productDetail")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="photos" header="Photos" body={imagePhotosTemplate7} filter={selectedFilterFields.includes("photos")} hidden={selectedHideFields?.includes("photos")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="conditon" header="Conditon" body={dropdownArrayConditonTemplate8} filter={selectedFilterFields.includes("conditon")} hidden={selectedHideFields?.includes("conditon")}    style={{ minWidth: "8rem" }} />
<Column field="status" header="Status" body={dropdownArrayStatusTemplate9} filter={selectedFilterFields.includes("status")} hidden={selectedHideFields?.includes("status")}    style={{ minWidth: "8rem" }} />
<Column field="refundMethod" header="Refund Method" body={dropdownArrayRefundMethodTemplate10} filter={selectedFilterFields.includes("refundMethod")} hidden={selectedHideFields?.includes("refundMethod")}    style={{ minWidth: "8rem" }} />
<Column field="refundAmount" header="Refund Amount" body={currencyRefundAmountTemplate11} filter={selectedFilterFields.includes("refundAmount")} hidden={selectedHideFields?.includes("refundAmount")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="refundRef" header="Refund Ref" body={editorRefundRefTemplate12} filter={selectedFilterFields.includes("refundRef")} hidden={selectedHideFields?.includes("refundRef")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="dateReturn" header="Date Return" body={p_dateDateReturnTemplate13} filter={selectedFilterFields.includes("dateReturn")} hidden={selectedHideFields?.includes("dateReturn")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="requestedAt" header="Requested At" body={p_dateRequestedAtTemplate14} filter={selectedFilterFields.includes("requestedAt")} hidden={selectedHideFields?.includes("requestedAt")}  sortable  style={{ minWidth: "8rem" }} />
<Column field="refundedAt" header="Refunded At" body={p_dateRefundedAtTemplate15} filter={selectedFilterFields.includes("refundedAt")} hidden={selectedHideFields?.includes("refundedAt")}  sortable  style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>


      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}


        <Dialog header="Upload ReturnsRefunds Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="returnsRefunds"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search ReturnsRefunds" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default ReturnsRefundsDataTable;