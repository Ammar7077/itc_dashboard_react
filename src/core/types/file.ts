export type TFile = {
  parent_id: string;
  name: string;
  size: number;
  extension: string;
  document_type: string;
  path: {
    pathString: string
  };
}