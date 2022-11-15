import _g from "./g";
import easyqb from 'easyqb';
import { SQW } from "easyqb/types/sq";
import { NewExpression } from "easyqb/types/expression";
import authFactory from "./auth";
import { POST_TYPES, DB_STATUS, Globals, EXECUTE_COUNT, FileFromURI, StatusResponse } from "./types";
import imageExtensions from "./assets/image-extensions.json";
import videoExtensions from "./assets/video-extensions.json";

interface IdbFactory {
    db: (tableName?: string, userAssociatedRecordsOnly?: boolean) => SQW;
    dbEventListener: (callback: (status?: DB_STATUS, queryType?: string, executeCount?: EXECUTE_COUNT, tableName?: string | null, returned?: any) => void) => () => void;
    e: NewExpression;
    setImage(recordKey: string, columnName: string, image: File | FileFromURI, tableName?: string): Promise<StatusResponse>;
    setVideo(recordKey: string, columnName: string, video: File | FileFromURI, tableName?: string): Promise<StatusResponse>;
    setFile(recordKey: string, columnName: string, file: File | FileFromURI, tableName?: string): Promise<StatusResponse>;
}

interface IUploadFile {
    recordKey: string;
    columnName: string;
    attachment: File | FileFromURI;
    type: "image" | "video" | "file"
    tableName?: string;
}

export default function dbFactory(globals?: Globals): IdbFactory {
    const g = globals || _g;
    const { tokenPost, tokenPostAttachment } = authFactory(g);
    let _listenerIndex = 0;

    const _listeners: Record<string, (status?: DB_STATUS, queryType?: string, executeCount?: EXECUTE_COUNT, tableName?: string | null, returned?: any) => void> = {};

    function _runListeners(...params: any[]) {
        for (const cb of Object.values(_listeners)) {
            cb(...params)
        }
    }

    const dbEventListener = (callback: (status?: DB_STATUS, queryType?: string, executeCount?: EXECUTE_COUNT, tableName?: string | null, returned?: any) => void): () => void => {
        const currKey = '' + _listenerIndex++;
        _listeners[currKey] = callback;
        return () => {
            delete _listeners[currKey]
        }
    }

    const allCallback = async (trx: any, tableName: string, userAssociatedRecordsOnly?: boolean): Promise<Record<string, any>[] | number[]> => {
        trx.count = "all";
        trx.tableName = tableName;
        if (userAssociatedRecordsOnly) trx.userAssociatedRecordsOnly = userAssociatedRecordsOnly;
        _runListeners(DB_STATUS.PENDING, trx.type, EXECUTE_COUNT.ALL, tableName !== "untable" ? tableName : null);
        try {
            const res = await tokenPost(POST_TYPES.EASY_QB, trx);
            if (res.success) {
                g.analyticsEnabled && g.analyticsEventsToTrack.db_all && g.analyticsEvent('db_all', { tableName: tableName !== "untable" ? tableName : undefined, type: trx.type });
                _runListeners(DB_STATUS.SUCCESS, trx.type, EXECUTE_COUNT.ALL, tableName !== "untable" ? tableName : null, res.data);
                return res.data;
            } else {
                _runListeners(DB_STATUS.ERROR, trx.type, EXECUTE_COUNT.ALL, tableName !== "untable" ? tableName : null);
                return res;
            }
        } catch (error) {
            console.warn(error)
            _runListeners(DB_STATUS.ERROR, trx.type, EXECUTE_COUNT.ALL, tableName !== "untable" ? tableName : null);
            return [];
        }
    }

    const oneCallback = async (trx: any, tableName: string, userAssociatedRecordsOnly?: boolean): Promise<Record<string, any> | number> => {
        trx.count = "one";
        trx.tableName = tableName;
        if (userAssociatedRecordsOnly) trx.userAssociatedRecordsOnly = userAssociatedRecordsOnly;
        _runListeners(DB_STATUS.PENDING, trx.type, EXECUTE_COUNT.ONE, tableName !== "untable" ? tableName : null);
        try {
            const res = await tokenPost(POST_TYPES.EASY_QB, trx);
            if (res.success) {
                g.analyticsEnabled && g.analyticsEventsToTrack.db_one && g.analyticsEvent('db_one', { tableName: tableName !== "untable" ? tableName : undefined, type: trx.type });
                _runListeners(DB_STATUS.SUCCESS, trx.type, EXECUTE_COUNT.ONE, tableName !== "untable" ? tableName : null, res.data);
                return res.data;
            } else {
                _runListeners(DB_STATUS.ERROR, trx.type, EXECUTE_COUNT.ONE, tableName !== "untable" ? tableName : null);
                return res;
            }
        } catch (error) {
            console.warn(error)
            _runListeners(DB_STATUS.ERROR, trx.type, EXECUTE_COUNT.ONE, tableName !== "untable" ? tableName : null);
            return {};
        }
    }

    const db = (tableName?: string, userAssociatedRecordsOnly?: boolean) => {
        if (tableName && typeof tableName === "string") {
            return easyqb({ allCallback, oneCallback, userAssociatedRecordsOnly, tableName: tableName.toUpperCase() })(tableName.replace(/[^0-9a-zA-Z]/g, '_').toUpperCase());
        } else {
            return easyqb({ allCallback, oneCallback, userAssociatedRecordsOnly, tableName: "untable" })("untable");
        }
    }

    const _setAttachment = async ({ recordKey, columnName, attachment, tableName, type }: IUploadFile): Promise<StatusResponse> => {
        const ext: string = attachment.name.split(".").pop()!.toLowerCase();

        // Similar pattern as db() naming
        let fixedTableName: string;
        if (tableName && typeof tableName === "string") {
            fixedTableName = tableName.toUpperCase();
        } else {
            fixedTableName = "untable";
        }

        if (type === "image" && !imageExtensions.includes(ext)) {
            return {
                success: false,
                message: "Image files must have a proper image extension in the file name"
            };
        }

        if (type === "video" && !videoExtensions.includes(ext)) {
            return {
                success: false,
                message: "Video files must have a proper video extension in the file name"
            };
        }

        const formData = new FormData();

        formData.append("file", attachment as Blob);
        formData.append("name", attachment.name);

        const customHeaders = {
            'Eb-upload-type': type,
            'Eb-column-name': columnName,
            'Eb-record-id': recordKey,
            'Eb-table-name': fixedTableName
        }

        try {
            const res = await tokenPostAttachment(formData, customHeaders);
            if (res.success) {
                g.analyticsEnabled && g.analyticsEventsToTrack.db_one && g.analyticsEvent('db_one', { tableName: fixedTableName !== "untable" ? fixedTableName : undefined, type: "update" });
                _runListeners(DB_STATUS.SUCCESS, "update", EXECUTE_COUNT.ONE, fixedTableName !== "untable" ? fixedTableName : null, res.data);
            } else {
                _runListeners(DB_STATUS.ERROR, "update", EXECUTE_COUNT.ONE, fixedTableName !== "untable" ? fixedTableName : null);
            }
            return {
                message: res.data,
                success: res.success
            };
        } catch (error) {
            console.warn(error)
            _runListeners(DB_STATUS.ERROR, "update", EXECUTE_COUNT.ONE, fixedTableName !== "untable" ? fixedTableName : null);
            return {
                message: "",
                success: false,
            };
        }
    }

    const setImage = async (recordKey: string, columnName: string, image: File | FileFromURI, tableName?: string) => _setAttachment({
        recordKey,
        columnName,
        tableName,
        attachment: image,
        type: "image"
    });

    const setVideo = async (recordKey: string, columnName: string, video: File | FileFromURI, tableName?: string) => _setAttachment({
        recordKey,
        columnName,
        tableName,
        attachment: video,
        type: "video"
    });

    const setFile = async (recordKey: string, columnName: string, file: File | FileFromURI, tableName?: string) => _setAttachment({
        recordKey,
        columnName,
        tableName,
        attachment: file,
        type: "file"
    });

    return {
        db,
        dbEventListener,
        e: easyqb().e,
        setImage,
        setFile,
        setVideo
    }
}
