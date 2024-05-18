import { deleteAsync } from 'del'

// Обнуление директории dist
export const reset = () => {
    return deleteAsync(app.path.clean);
}