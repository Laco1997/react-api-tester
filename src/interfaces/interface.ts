import { Dispatch, SetStateAction } from 'react';

export interface BodyProps {
  body: any;
  setBody: Dispatch<SetStateAction<any>>;
}

export interface TableItem {
  key: string;
  value: string;
}

export interface ParamsTabProps {
  paramRows: TableItem[];
  setParamRows: Dispatch<SetStateAction<TableItem[]>>;
}

export interface HeadersTabProps {
  headerRows: TableItem[];
  setHeaderRows: Dispatch<SetStateAction<TableItem[]>>;
}

export interface TabsProps {
  paramRows: TableItem[];
  setParamRows: Dispatch<SetStateAction<TableItem[]>>;
  headerRows: TableItem[];
  setHeaderRows: Dispatch<SetStateAction<TableItem[]>>;
  body: any;
  setBody: Dispatch<SetStateAction<any>>;
}