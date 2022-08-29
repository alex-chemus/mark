export interface IFile {
  fileID: number
  fileName: string,
  fileType: string,
  fileFormat: string,
  fileExtension: string,
  fileSize: number,
  uploadDate: string,
  urlToFile: string
}

export interface IFolder {
  folderID: number,
  folderName: string
}

export interface IFolderInfo {
  //[key: string]: IFile | IFolder
  folders: IFolder[],
  files: IFile[]
}

export type NavItem = '/cloud/private' | '/cloud/groups'

export type IGroupName = {
  groupName: string,
  groupID: number
}
