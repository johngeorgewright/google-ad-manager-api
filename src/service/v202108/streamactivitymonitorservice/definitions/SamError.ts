
/**
 * samError
 * @targetNSAlias `tns`
 * @targetNamespace `https://www.google.com/apis/ads/publisher/v202108`
 */
export interface SamError {
    /** SamErrorType|xsd:string|INTERNAL_ERROR,AD_REQUEST_ERROR,VAST_PARSE_ERROR,UNSUPPORTED_AD_SYSTEM,CANNOT_FIND_UNIQUE_TRANSCODE_ID,CANNOT_FIND_MEDIA_FILE_PATH,MISSING_INLINE_ELEMENTS,MAX_WRAPPER_DEPTH_REACHED,INVALID_AD_SEQUENCE_NUMBER,FAILED_PING,AD_TAG_PARSE_ERROR,VMAP_PARSE_ERROR,INVALID_VMAP_RESPONSE,NO_AD_BREAKS_IN_VMAP,CUSTOM_AD_SOURCE_IN_VMAP,AD_BREAK_TYPE_NOT_SUPPORTED,NEITHER_AD_SOURCE_NOR_TRACKING,UNKNOWN_ERROR,AD_POD_DROPPED_TO_MANY_AD_PODS,AD_POD_DROPPED_EMPTY_ADS,AD_BREAK_WITHOUT_AD_POD,TRANSCODING_IN_PROGRESS,UNSUPPORTED_VAST_VERSION,AD_POD_DROPPED_BUMPER_ERROR,NO_VALID_MEDIAFILES_FOUND,EXCEEDS_MAX_FILLER,SKIPPABLE_AD_NOT_SUPPORTED,AD_REQUEST_TIMEOUT,AD_POD_DROPPED_UNSUPPORTED_TYPE,DUPLICATE_AD_TAG,FOLLOW_REDIRECTS_IS_FALSE,UNKNOWN */
    samErrorType?: string;
    /** xsd:string */
    errorDetails?: string;
}
