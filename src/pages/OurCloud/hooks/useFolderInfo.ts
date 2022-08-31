import { ref } from 'vue'
import { useFetch, IError } from '@/shared'
import { store } from '@/store'
import { IFolderInfo } from '@/features/cloud/types'

interface Params {
  folderID: number | null | string,
  groupID: number | string
}

// переименовать в folderInfo
const useCloudInfo = () => {
  const folderInfo = ref<IFolderInfo | null>(null)
  const folderName = ref<string | null>(null)

  const fetchFolderInfo = async ({ folderID, groupID }: Params) => {
    const { response, error } = await useFetch({
      path: 'markMethods/groupCloud.getFiles',
      data: folderID
        ? { groupID, folderID }
        : { groupID }
    })

    if (error) {
      store.dispatch('setError', error as IError)
      console.log(error)
    } else {
      folderName.value = response.folderName
      const info: IFolderInfo = {
        folders: [],
        files: []
      }
      Object.entries(response.content).forEach((item: any[]) => {
        if (item[0].startsWith('folder_')) {
          //info.folders.push(item[0].slice(6))
          info.folders.push({
            folderID: item[0].slice(7) as number,
            folderName: item[1].folderName as string
          })
        } else {
          info.files.push({
            ...item[1],
            fileID: item[0].slice(5)
          })
        }
      })
      folderInfo.value = info
    }
  }

  return { folderInfo, folderName, fetchFolderInfo }
}

export default useCloudInfo
