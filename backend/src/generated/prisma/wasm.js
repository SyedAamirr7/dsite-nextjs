
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AboutScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  About_Title_ar: 'About_Title_ar',
  About_Title_en: 'About_Title_en',
  About_Subtitle_ar: 'About_Subtitle_ar',
  About_Subtitle_en: 'About_Subtitle_en',
  About_Summary_ar: 'About_Summary_ar',
  About_Summary_en: 'About_Summary_en',
  About_Detail_ar: 'About_Detail_ar',
  About_Detail_en: 'About_Detail_en',
  About_Title1_ar: 'About_Title1_ar',
  About_Title2_ar: 'About_Title2_ar',
  About_Title3_ar: 'About_Title3_ar',
  About_Title4_ar: 'About_Title4_ar',
  About_Title5_ar: 'About_Title5_ar',
  About_Title6_ar: 'About_Title6_ar',
  About_Title7_ar: 'About_Title7_ar',
  About_Title8_ar: 'About_Title8_ar',
  About_Title1_en: 'About_Title1_en',
  About_Title2_en: 'About_Title2_en',
  About_Title3_en: 'About_Title3_en',
  About_Title4_en: 'About_Title4_en',
  About_Title5_en: 'About_Title5_en',
  About_Title6_en: 'About_Title6_en',
  About_Title7_en: 'About_Title7_en',
  About_Title8_en: 'About_Title8_en',
  About_Title1_Value_ar: 'About_Title1_Value_ar',
  About_Title2_Value_ar: 'About_Title2_Value_ar',
  About_Title3_Value_ar: 'About_Title3_Value_ar',
  About_Title4_Value_ar: 'About_Title4_Value_ar',
  About_Title5_Value_ar: 'About_Title5_Value_ar',
  About_Title6_Value_ar: 'About_Title6_Value_ar',
  About_Title7_Value_ar: 'About_Title7_Value_ar',
  About_Title8_Value_ar: 'About_Title8_Value_ar',
  About_Title1_Value_en: 'About_Title1_Value_en',
  About_Title2_Value_en: 'About_Title2_Value_en',
  About_Title3_Value_en: 'About_Title3_Value_en',
  About_Title4_Value_en: 'About_Title4_Value_en',
  About_Title5_Value_en: 'About_Title5_Value_en',
  About_Title6_Value_en: 'About_Title6_Value_en',
  About_Title7_Value_en: 'About_Title7_Value_en',
  About_Title8_Value_en: 'About_Title8_Value_en',
  About_Tags: 'About_Tags',
  About_Image: 'About_Image',
  Timestamp: 'Timestamp',
  About_ImgStatus: 'About_ImgStatus',
  Status: 'Status',
  About_Background: 'About_Background'
};

exports.Prisma.Acp_log_operationsScalarFieldEnum = {
  Log_ID: 'Log_ID',
  Change_Row_ID: 'Change_Row_ID',
  User_ID: 'User_ID',
  IP_Address: 'IP_Address',
  Action_Table: 'Action_Table',
  Website_ID: 'Website_ID',
  Content: 'Content',
  Event_Performed: 'Event_Performed',
  TimeStamp: 'TimeStamp'
};

exports.Prisma.AdsScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Ad_Title_ar: 'Ad_Title_ar',
  Ad_Title_en: 'Ad_Title_en',
  Status: 'Status',
  Timestamp: 'Timestamp',
  Deleted: 'Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.Ads_label_valuesScalarFieldEnum = {
  ID: 'ID',
  AD_ID: 'AD_ID',
  Label_Name_ar: 'Label_Name_ar',
  Label_Name_en: 'Label_Name_en',
  Input_Type: 'Input_Type',
  Sub_Values_ar: 'Sub_Values_ar',
  Sub_Values_en: 'Sub_Values_en',
  Status: 'Status',
  Order_No: 'Order_No',
  Timestamp: 'Timestamp',
  Deleted: 'Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.Ads_ordersScalarFieldEnum = {
  ID: 'ID',
  Label_ID: 'Label_ID',
  Ad_Label_Content: 'Ad_Label_Content',
  Form_ID: 'Form_ID',
  Timestamp: 'Timestamp'
};

exports.Prisma.AppScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  App_Subtitle_ar: 'App_Subtitle_ar',
  App_Subtitle_en: 'App_Subtitle_en',
  App_Image: 'App_Image',
  App_Background: 'App_Background',
  Timestamp: 'Timestamp',
  playstore_logo: 'playstore_logo',
  appstore_logo: 'appstore_logo',
  huawei_logo: 'huawei_logo',
  playstore_link: 'playstore_link',
  ios_link: 'ios_link',
  appgallery_link: 'appgallery_link',
  Status: 'Status'
};

exports.Prisma.AppsScalarFieldEnum = {
  ID: 'ID',
  APP_Title_ar: 'APP_Title_ar',
  APP_Title_en: 'APP_Title_en',
  APP_Link: 'APP_Link',
  Apple_Link: 'Apple_Link',
  status: 'status',
  Timestamp: 'Timestamp',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.BannerScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Banner_Title_ar: 'Banner_Title_ar',
  Banner_Title_en: 'Banner_Title_en',
  Banner_Sub_Title_en: 'Banner_Sub_Title_en',
  Banner_Sub_Title_ar: 'Banner_Sub_Title_ar',
  Banner_Description_ar: 'Banner_Description_ar',
  Banner_Description_en: 'Banner_Description_en',
  Banner_Image: 'Banner_Image',
  Banner_Background: 'Banner_Background',
  Status: 'Status'
};

exports.Prisma.BranchScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Branch_Title_ar: 'Branch_Title_ar',
  Branch_Title_en: 'Branch_Title_en',
  Branch_Detail_ar: 'Branch_Detail_ar',
  Branch_Detail_en: 'Branch_Detail_en',
  Branch_Image: 'Branch_Image',
  Branch_lat: 'Branch_lat',
  Branch_lng: 'Branch_lng',
  Order_No: 'Order_No',
  Timestamp: 'Timestamp',
  Status: 'Status',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.CareerScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Job_Title_ar: 'Job_Title_ar',
  Job_Title_en: 'Job_Title_en',
  Job_Description_ar: 'Job_Description_ar',
  Job_Description_en: 'Job_Description_en',
  Order_No: 'Order_No',
  Status: 'Status',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At',
  Timestamp: 'Timestamp'
};

exports.Prisma.Career_applicantsScalarFieldEnum = {
  ID: 'ID',
  Career_ID: 'Career_ID',
  name: 'name',
  email: 'email',
  phone: 'phone',
  nationality: 'nationality',
  cv_file: 'cv_file',
  gender: 'gender',
  city: 'city',
  DOB: 'DOB',
  Order_No: 'Order_No',
  Timestamp: 'Timestamp'
};

exports.Prisma.ClientScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Client_Title_ar: 'Client_Title_ar',
  Client_Title_en: 'Client_Title_en',
  Client_Image: 'Client_Image',
  Client_Link: 'Client_Link',
  Order_No: 'Order_No',
  Timestamp: 'Timestamp',
  Status: 'Status',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.ContactScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Contact_Title_ar: 'Contact_Title_ar',
  Contact_Title_en: 'Contact_Title_en',
  Contact_Address_en: 'Contact_Address_en',
  Contact_Address_ar: 'Contact_Address_ar',
  Contact_Tel: 'Contact_Tel',
  Contact_Fax: 'Contact_Fax',
  Contact_Email: 'Contact_Email',
  Contact_Background: 'Contact_Background',
  Timstamp: 'Timstamp',
  Status: 'Status'
};

exports.Prisma.CountriesScalarFieldEnum = {
  country_code: 'country_code',
  country_enName: 'country_enName',
  country_arName: 'country_arName',
  country_enNationality: 'country_enNationality',
  country_arNationality: 'country_arNationality'
};

exports.Prisma.CustomerScalarFieldEnum = {
  Customer_ID: 'Customer_ID',
  Fullname: 'Fullname',
  Email: 'Email',
  Password: 'Password',
  Phone: 'Phone',
  Address: 'Address',
  Photo: 'Photo',
  Status: 'Status',
  Reset_Token: 'Reset_Token',
  Reset_Otp: 'Reset_Otp',
  Reset_Token_Expiry: 'Reset_Token_Expiry',
  Timestamp: 'Timestamp'
};

exports.Prisma.FooterScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Footer_Copyright: 'Footer_Copyright',
  Footer_Poweredby: 'Footer_Poweredby',
  Timestamp: 'Timestamp'
};

exports.Prisma.Form_fieldsScalarFieldEnum = {
  ID: 'ID',
  FormID: 'FormID',
  label_name_ar: 'label_name_ar',
  label_name_en: 'label_name_en',
  field_type: 'field_type',
  options_ar: 'options_ar',
  options_en: 'options_en',
  placeholder_ar: 'placeholder_ar',
  placeholder_en: 'placeholder_en',
  required: 'required',
  Order_No: 'Order_No',
  Status: 'Status',
  Timestamp: 'Timestamp',
  Updated_At: 'Updated_At',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.FormsScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Form_Title_ar: 'Form_Title_ar',
  Form_Title_en: 'Form_Title_en',
  Status: 'Status',
  Timestamp: 'Timestamp',
  Updated_At: 'Updated_At',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.GalleryScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Gallery_Title_ar: 'Gallery_Title_ar',
  Gallery_Title_en: 'Gallery_Title_en',
  Timestamp: 'Timestamp',
  Gallery_Image: 'Gallery_Image',
  Gallery_Link: 'Gallery_Link',
  Order_No: 'Order_No',
  Status: 'Status',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.Global_settingsScalarFieldEnum = {
  ID: 'ID',
  Setting_Key: 'Setting_Key',
  Value: 'Value',
  Timestamp: 'Timestamp'
};

exports.Prisma.LocalizationScalarFieldEnum = {
  ID: 'ID',
  Key: 'Key',
  String_en: 'String_en',
  String_ar: 'String_ar',
  Category_ID: 'Category_ID',
  Created_at: 'Created_at'
};

exports.Prisma.Logs_operationsScalarFieldEnum = {
  Log_ID: 'Log_ID',
  Change_Row_ID: 'Change_Row_ID',
  User_ID: 'User_ID',
  IP_Address: 'IP_Address',
  Action_Table: 'Action_Table',
  Content: 'Content',
  Event_Performed: 'Event_Performed',
  TimeStamp: 'TimeStamp'
};

exports.Prisma.NavScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Nav_Title_ar: 'Nav_Title_ar',
  Nav_Title_en: 'Nav_Title_en',
  Nav_Link: 'Nav_Link',
  Nav_Logo: 'Nav_Logo',
  Timestamp: 'Timestamp'
};

exports.Prisma.NewsScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  News_Title_ar: 'News_Title_ar',
  News_Title_en: 'News_Title_en',
  News_Subtitle_ar: 'News_Subtitle_ar',
  News_Subtitle_en: 'News_Subtitle_en',
  News_Description_ar: 'News_Description_ar',
  News_Description_en: 'News_Description_en',
  News_Detail_ar: 'News_Detail_ar',
  News_Detail_en: 'News_Detail_en',
  News_Date: 'News_Date',
  News_Author: 'News_Author',
  News_Tags: 'News_Tags',
  News_Image: 'News_Image',
  Slug_ar: 'Slug_ar',
  Slug_en: 'Slug_en',
  Timestamp: 'Timestamp',
  Status: 'Status',
  Order_No: 'Order_No',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.Page_label_valuesScalarFieldEnum = {
  ID: 'ID',
  PageID: 'PageID',
  Label_Name_ar: 'Label_Name_ar',
  Label_Name_en: 'Label_Name_en',
  Input_Type: 'Input_Type',
  Sub_Values_ar: 'Sub_Values_ar',
  Sub_Values_en: 'Sub_Values_en',
  Status: 'Status',
  Order_No: 'Order_No',
  Timestamp: 'Timestamp',
  Deleted: 'Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.Page_linksScalarFieldEnum = {
  ID: 'ID',
  PageID: 'PageID',
  link_name_ar: 'link_name_ar',
  link_name_en: 'link_name_en',
  link_visitors: 'link_visitors',
  Status: 'Status',
  Timestamp: 'Timestamp',
  is_Deleted: 'is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.Page_ordersScalarFieldEnum = {
  ID: 'ID',
  Page_ID: 'Page_ID',
  Label_ID: 'Label_ID',
  Content: 'Content',
  Form_ID: 'Form_ID',
  Status: 'Status',
  Timestamp: 'Timestamp'
};

exports.Prisma.Page_visitorsScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  IP: 'IP',
  Browser: 'Browser',
  BrowserVersion: 'BrowserVersion',
  Platform: 'Platform',
  pageName: 'pageName',
  pageURL: 'pageURL',
  Timestamp: 'Timestamp'
};

exports.Prisma.PagesScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Page_Title_ar: 'Page_Title_ar',
  Page_Title_en: 'Page_Title_en',
  Page_Description_ar: 'Page_Description_ar',
  Page_Description_en: 'Page_Description_en',
  Page_Content_ar: 'Page_Content_ar',
  Page_Content_en: 'Page_Content_en',
  Page_Summary_ar: 'Page_Summary_ar',
  Page_Summary_en: 'Page_Summary_en',
  Page_Tags: 'Page_Tags',
  Slug_ar: 'Slug_ar',
  Slug_en: 'Slug_en',
  Last_Updated: 'Last_Updated',
  Order_No: 'Order_No',
  Page_request: 'Page_request',
  FormID: 'FormID',
  Status: 'Status',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At',
  Page_Background: 'Page_Background',
  Timestamp: 'Timestamp'
};

exports.Prisma.PartnerScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Partner_Title_ar: 'Partner_Title_ar',
  Partner_Title_en: 'Partner_Title_en',
  Partner_Image: 'Partner_Image',
  Partner_Link: 'Partner_Link',
  Order_No: 'Order_No',
  Timestamp: 'Timestamp',
  Status: 'Status',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.PlansScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Plans_Title_ar: 'Plans_Title_ar',
  Plans_Title_en: 'Plans_Title_en',
  Plans_Description_ar: 'Plans_Description_ar',
  Plans_Description_en: 'Plans_Description_en',
  Plans_duration: 'Plans_duration',
  Plans_Price: 'Plans_Price',
  Plans_Picture: 'Plans_Picture',
  Slug_ar: 'Slug_ar',
  Slug_en: 'Slug_en',
  Order_No: 'Order_No',
  Status: 'Status',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At',
  Timestamp: 'Timestamp'
};

exports.Prisma.Plans_featuresScalarFieldEnum = {
  F_ID: 'F_ID',
  Plan_ID: 'Plan_ID',
  F_TEXT_en: 'F_TEXT_en',
  F_TEXT_ar: 'F_TEXT_ar',
  Timestamp: 'Timestamp'
};

exports.Prisma.PortfolioScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Portfolio_Title_ar: 'Portfolio_Title_ar',
  Portfolio_Title_en: 'Portfolio_Title_en',
  Portfolio_Subtitle_ar: 'Portfolio_Subtitle_ar',
  Portfolio_Subtitle_en: 'Portfolio_Subtitle_en',
  Portfolio_Jobdescription_ar: 'Portfolio_Jobdescription_ar',
  Portfolio_Jobdescription_en: 'Portfolio_Jobdescription_en',
  Portfolio_Detail_ar: 'Portfolio_Detail_ar',
  Portfolio_Detail_en: 'Portfolio_Detail_en',
  Portfolio_Image: 'Portfolio_Image',
  Portfolio_Link: 'Portfolio_Link',
  Timestamp: 'Timestamp',
  Status: 'Status',
  LinkType: 'LinkType',
  Link: 'Link',
  Slug_ar: 'Slug_ar',
  Slug_en: 'Slug_en',
  Order_No: 'Order_No',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.ProductScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Product_Title_ar: 'Product_Title_ar',
  Product_Title_en: 'Product_Title_en',
  Product_Subtitle_ar: 'Product_Subtitle_ar',
  Product_Subtitle_en: 'Product_Subtitle_en',
  Product_Detail_ar: 'Product_Detail_ar',
  Product_Detail_en: 'Product_Detail_en',
  Product_Description_ar: 'Product_Description_ar',
  Product_Description_en: 'Product_Description_en',
  Product_Price: 'Product_Price',
  Product_Number: 'Product_Number',
  Product_Image: 'Product_Image',
  video_url: 'video_url',
  CAT_ID: 'CAT_ID',
  Brand_ID: 'Brand_ID',
  requests: 'requests',
  Order_No: 'Order_No',
  Timestamp: 'Timestamp',
  Status: 'Status',
  FormID: 'FormID',
  LinkType: 'LinkType',
  Link: 'Link',
  Slug_ar: 'Slug_ar',
  Slug_en: 'Slug_en',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.Product_brandsScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Product_Brand_Title_ar: 'Product_Brand_Title_ar',
  Product_Brand_Title_en: 'Product_Brand_Title_en',
  Product_Brand_Image: 'Product_Brand_Image',
  Status: 'Status',
  Timestamp: 'Timestamp',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.Product_categoriesScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Product_CAT_Title_ar: 'Product_CAT_Title_ar',
  Product_CAT_Title_en: 'Product_CAT_Title_en',
  Status: 'Status',
  Timestamp: 'Timestamp',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.Product_featuresScalarFieldEnum = {
  PF_ID: 'PF_ID',
  PrPrice_ID: 'PrPrice_ID',
  PF_TEXT_en: 'PF_TEXT_en',
  PF_TEXT_ar: 'PF_TEXT_ar',
  Status: 'Status',
  Timestamp: 'Timestamp'
};

exports.Prisma.Product_form_label_optionsScalarFieldEnum = {
  ID: 'ID',
  product_form_labels_id: 'product_form_labels_id',
  option_value_en: 'option_value_en',
  option_value_ar: 'option_value_ar',
  option_Status: 'option_Status',
  Timestamp: 'Timestamp'
};

exports.Prisma.Product_form_labelsScalarFieldEnum = {
  ID: 'ID',
  Section_ID: 'Section_ID',
  input_label_en: 'input_label_en',
  input_label_ar: 'input_label_ar',
  placeholder_en: 'placeholder_en',
  placeholder_ar: 'placeholder_ar',
  input_type: 'input_type',
  is_active: 'is_active',
  required: 'required',
  Order_No: 'Order_No',
  Timestamp: 'Timestamp'
};

exports.Prisma.Product_imagesScalarFieldEnum = {
  ID: 'ID',
  productID: 'productID',
  Image_title_en: 'Image_title_en',
  Image_title_ar: 'Image_title_ar',
  Image_name: 'Image_name',
  Timestamp: 'Timestamp'
};

exports.Prisma.Product_ordersScalarFieldEnum = {
  ID: 'ID',
  Product_ID: 'Product_ID',
  Label_ID: 'Label_ID',
  Content: 'Content',
  Form_ID: 'Form_ID',
  Status: 'Status',
  Timestamp: 'Timestamp'
};

exports.Prisma.Product_pricesScalarFieldEnum = {
  Price_ID: 'Price_ID',
  Price: 'Price',
  mPrice: 'mPrice',
  Name_ar: 'Name_ar',
  Name_en: 'Name_en',
  Description_ar: 'Description_ar',
  Description_en: 'Description_en',
  Timestamp: 'Timestamp',
  period: 'period',
  mperiod: 'mperiod',
  Price_Status: 'Price_Status',
  is_delete: 'is_delete'
};

exports.Prisma.ProjectScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Project_Title_ar: 'Project_Title_ar',
  Project_Title_en: 'Project_Title_en',
  Project_Subtitle_ar: 'Project_Subtitle_ar',
  Project_Subtitle_en: 'Project_Subtitle_en',
  Project_ShortDescription_en: 'Project_ShortDescription_en',
  Project_ShortDescription_ar: 'Project_ShortDescription_ar',
  Project_Detail_ar: 'Project_Detail_ar',
  Project_Detail_en: 'Project_Detail_en',
  Project_Image: 'Project_Image',
  Project_Logo: 'Project_Logo',
  Project_Background: 'Project_Background',
  Order_No: 'Order_No',
  Timestamp: 'Timestamp',
  Form_Status: 'Form_Status',
  FormID: 'FormID',
  Slug_ar: 'Slug_ar',
  Slug_en: 'Slug_en',
  Status: 'Status',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.Project_formsScalarFieldEnum = {
  PF_ID: 'PF_ID',
  Proj_ID: 'Proj_ID',
  PF_TEXT_en: 'PF_TEXT_en',
  PF_TEXT_ar: 'PF_TEXT_ar',
  PF_Status: 'PF_Status',
  Timestamp: 'Timestamp'
};

exports.Prisma.Project_ordersScalarFieldEnum = {
  ID: 'ID',
  Project_ID: 'Project_ID',
  Label_ID: 'Label_ID',
  Content: 'Content',
  Form_ID: 'Form_ID',
  Status: 'Status',
  Timestamp: 'Timestamp'
};

exports.Prisma.ResellerScalarFieldEnum = {
  Reseller_ID: 'Reseller_ID',
  Reseller_Name: 'Reseller_Name',
  Timestamp: 'Timestamp'
};

exports.Prisma.Scripts_codeScalarFieldEnum = {
  ID: 'ID',
  Script_Name: 'Script_Name',
  Script_Footer: 'Script_Footer',
  Script_Header: 'Script_Header',
  Timestamp: 'Timestamp'
};

exports.Prisma.Scripts_conversionScalarFieldEnum = {
  ID: 'ID',
  section_content_table: 'section_content_table',
  Table_ID: 'Table_ID',
  gtag_Conversion_ID: 'gtag_Conversion_ID',
  Timestamp: 'Timestamp'
};

exports.Prisma.Section_colorsScalarFieldEnum = {
  ID: 'ID',
  Section_ID: 'Section_ID',
  title_color: 'title_color',
  subtitle_color: 'subtitle_color',
  paragraph_color: 'paragraph_color',
  button_color: 'button_color',
  background_color: 'background_color',
  card_background_color: 'card_background_color',
  background_image: 'background_image',
  Timestamp: 'Timestamp'
};

exports.Prisma.SectionsScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Section_Title_ar: 'Section_Title_ar',
  Section_Title_en: 'Section_Title_en',
  Custom_Section_Title_ar: 'Custom_Section_Title_ar',
  Custom_Section_Title_en: 'Custom_Section_Title_en',
  Description_en: 'Description_en',
  Description_ar: 'Description_ar',
  Key_Words_en: 'Key_Words_en',
  Key_Words_ar: 'Key_Words_ar',
  Section_Image: 'Section_Image',
  Section_Content_Table: 'Section_Content_Table',
  Timestamp: 'Timestamp',
  Page_ID: 'Page_ID',
  Order_No: 'Order_No',
  BG_Color: 'BG_Color',
  Section_Request: 'Section_Request',
  Section_type: 'Section_type',
  Section_Request_Posiition: 'Section_Request_Posiition',
  In_Header: 'In_Header',
  Status: 'Status'
};

exports.Prisma.ServiceScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Service_Title_ar: 'Service_Title_ar',
  Service_Title_en: 'Service_Title_en',
  Service_Subtitle_ar: 'Service_Subtitle_ar',
  Service_Subtitle_en: 'Service_Subtitle_en',
  Service_Detail_ar: 'Service_Detail_ar',
  Service_Detail_en: 'Service_Detail_en',
  Service_Description_ar: 'Service_Description_ar',
  Service_Description_en: 'Service_Description_en',
  Service_Image: 'Service_Image',
  Timestamp: 'Timestamp',
  Status: 'Status',
  FormID: 'FormID',
  LinkType: 'LinkType',
  Link: 'Link',
  Slug_ar: 'Slug_ar',
  Slug_en: 'Slug_en',
  video_url: 'video_url',
  Order_No: 'Order_No',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.Service_ordersScalarFieldEnum = {
  ID: 'ID',
  Service_ID: 'Service_ID',
  Label_ID: 'Label_ID',
  Content: 'Content',
  Form_ID: 'Form_ID',
  Status: 'Status',
  Timestamp: 'Timestamp'
};

exports.Prisma.SessionsScalarFieldEnum = {
  id: 'id',
  ip_address: 'ip_address',
  timestamp: 'timestamp',
  data: 'data'
};

exports.Prisma.SettingsScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Setting_Key: 'Setting_Key',
  Value: 'Value',
  Timestamp: 'Timestamp'
};

exports.Prisma.SliderScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Slider_Title_ar: 'Slider_Title_ar',
  Slider_Title_en: 'Slider_Title_en',
  Slider_Subtitle_ar: 'Slider_Subtitle_ar',
  Slider_Subtitle_en: 'Slider_Subtitle_en',
  Slider_Button_ar: 'Slider_Button_ar',
  Slider_Button_en: 'Slider_Button_en',
  Slider_Details_ar: 'Slider_Details_ar',
  Slider_Details_en: 'Slider_Details_en',
  Slider_Link: 'Slider_Link',
  File_Type: 'File_Type',
  Slider_Image: 'Slider_Image',
  Order_No: 'Order_No',
  flip_image: 'flip_image',
  Status: 'Status',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At',
  Timestamp: 'Timestamp',
  Slider_Video: 'Slider_Video'
};

exports.Prisma.Social_mediaScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Socialmedia_Title_ar: 'Socialmedia_Title_ar',
  Socialmedia_Title_en: 'Socialmedia_Title_en',
  Socialmedia_Link: 'Socialmedia_Link',
  Socialmedia_Icon: 'Socialmedia_Icon',
  Timestamp: 'Timestamp'
};

exports.Prisma.Sub_customerScalarFieldEnum = {
  ID: 'ID',
  Sub_Customer_ID: 'Sub_Customer_ID',
  Subscription_ID: 'Subscription_ID',
  Status: 'Status',
  Permission: 'Permission',
  Created_by: 'Created_by',
  Created_at: 'Created_at',
  Approved_at: 'Approved_at',
  Rejected_at: 'Rejected_at',
  Removed_at: 'Removed_at',
  Content: 'Content'
};

exports.Prisma.SubscriptionScalarFieldEnum = {
  Subscription_ID: 'Subscription_ID',
  Customer_ID: 'Customer_ID',
  Sku_ID: 'Sku_ID',
  Price_ID: 'Price_ID',
  Website_ID: 'Website_ID',
  period: 'period',
  Expire_At: 'Expire_At',
  Period_Type: 'Period_Type',
  Timestamp: 'Timestamp',
  IsAliasCreated: 'IsAliasCreated',
  subStatus: 'subStatus'
};

exports.Prisma.Subscription_historyScalarFieldEnum = {
  ID: 'ID',
  Subscription_ID: 'Subscription_ID',
  Customer_ID: 'Customer_ID',
  subscription_type: 'subscription_type',
  Sku_ID: 'Sku_ID',
  Price_ID: 'Price_ID',
  Amount: 'Amount',
  VAT: 'VAT',
  Website_ID: 'Website_ID',
  period: 'period',
  Expire_At: 'Expire_At',
  Start_Date: 'Start_Date',
  payment_verified: 'payment_verified',
  payment_ref: 'payment_ref',
  card_type: 'card_type',
  Timestamp: 'Timestamp',
  IsAliasCreated: 'IsAliasCreated',
  response_code: 'response_code',
  User_Role: 'User_Role',
  User_Id: 'User_Id'
};

exports.Prisma.TeamScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  name_ar: 'name_ar',
  position_ar: 'position_ar',
  name_en: 'name_en',
  position_en: 'position_en',
  Team_Description_ar: 'Team_Description_ar',
  Team_Description_en: 'Team_Description_en',
  Team_Photo: 'Team_Photo',
  Slug_ar: 'Slug_ar',
  Slug_en: 'Slug_en',
  Order_No: 'Order_No',
  Status: 'Status',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At',
  Timestamp: 'Timestamp'
};

exports.Prisma.Terms_and_conditionsScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  TC_title_en: 'TC_title_en',
  TC_title_ar: 'TC_title_ar',
  TC_subtitle_en: 'TC_subtitle_en',
  TC_subtitle_ar: 'TC_subtitle_ar',
  TC_detail_en: 'TC_detail_en',
  TC_detail_ar: 'TC_detail_ar',
  Status: 'Status',
  Timestamp: 'Timestamp'
};

exports.Prisma.UsersScalarFieldEnum = {
  User_ID: 'User_ID',
  Role_ID: 'Role_ID',
  Username: 'Username',
  Password: 'Password',
  Fullname: 'Fullname',
  Picture: 'Picture',
  Status: 'Status',
  Reset_Token: 'Reset_Token',
  Reset_Token_Expiry: 'Reset_Token_Expiry',
  Invitation_Status: 'Invitation_Status',
  Created_at: 'Created_at',
  Approved_at: 'Approved_at',
  Rejected_at: 'Rejected_at',
  Removed_at: 'Removed_at',
  Verify_Token: 'Verify_Token',
  Verify_Page_Token: 'Verify_Page_Token',
  Timestamp: 'Timestamp',
  NoAttempts: 'NoAttempts',
  LastFailedLogin: 'LastFailedLogin',
  Deleted_at: 'Deleted_at'
};

exports.Prisma.Users_rolesScalarFieldEnum = {
  Role_ID: 'Role_ID',
  Role: 'Role',
  Name: 'Name',
  Type: 'Type',
  Timestamp: 'Timestamp'
};

exports.Prisma.VideobannerScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  Videobanner_Title_ar: 'Videobanner_Title_ar',
  Videobanner_Title_en: 'Videobanner_Title_en',
  Videobanner_Url: 'Videobanner_Url',
  Videobanner_Background: 'Videobanner_Background',
  Timestamp: 'Timestamp',
  Status: 'Status'
};

exports.Prisma.VisitorScalarFieldEnum = {
  id: 'id',
  Website_ID: 'Website_ID',
  IP: 'IP',
  Browser: 'Browser',
  BrowserVersion: 'BrowserVersion',
  Platform: 'Platform',
  Timestamp: 'Timestamp'
};

exports.Prisma.Website_activity_templateScalarFieldEnum = {
  ID: 'ID',
  Activity_Type_ID: 'Activity_Type_ID',
  Section: 'Section',
  Status: 'Status',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At',
  Timestamp: 'Timestamp'
};

exports.Prisma.Website_activity_typeScalarFieldEnum = {
  ID: 'ID',
  Activity_Name_en: 'Activity_Name_en',
  Activity_Name_ar: 'Activity_Name_ar',
  Status: 'Status',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At',
  Timestamp: 'Timestamp'
};

exports.Prisma.Website_appScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  APP_ID: 'APP_ID',
  Restaurant_Link: 'Restaurant_Link',
  Apple_Restaurant_Link: 'Apple_Restaurant_Link',
  status: 'status',
  Timestamp: 'Timestamp'
};

exports.Prisma.Website_categoryScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  CAT_Title_ar: 'CAT_Title_ar',
  CAT_Title_en: 'CAT_Title_en',
  CAT_Image: 'CAT_Image',
  CAT_Tags: 'CAT_Tags',
  status: 'status',
  Timestamp: 'Timestamp',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.Website_itemScalarFieldEnum = {
  ID: 'ID',
  Website_ID: 'Website_ID',
  CAT_ID: 'CAT_ID',
  Item_Title_en: 'Item_Title_en',
  Item_Title_ar: 'Item_Title_ar',
  Item_Subtitle_en: 'Item_Subtitle_en',
  Item_Subtitle_ar: 'Item_Subtitle_ar',
  Item_Description_en: 'Item_Description_en',
  Item_Description_ar: 'Item_Description_ar',
  Item_Content_en: 'Item_Content_en',
  Item_Content_ar: 'Item_Content_ar',
  Item_Image: 'Item_Image',
  Item_Price: 'Item_Price',
  Item_ProductNo: 'Item_ProductNo',
  Slug_ar: 'Slug_ar',
  Slug_en: 'Slug_en',
  status: 'status',
  Order_No: 'Order_No',
  Timestamp: 'Timestamp',
  Is_Deleted: 'Is_Deleted',
  Deleted_At: 'Deleted_At'
};

exports.Prisma.Website_scriptsScalarFieldEnum = {
  ID: 'ID',
  Script_ID: 'Script_ID',
  Website_ID: 'Website_ID',
  Script_User_ID: 'Script_User_ID',
  Status: 'Status',
  Timestamp: 'Timestamp'
};

exports.Prisma.WebsitesScalarFieldEnum = {
  ID: 'ID',
  domain: 'domain',
  isVerified: 'isVerified',
  isWizard: 'isWizard',
  Reseller_ID: 'Reseller_ID',
  Status: 'Status',
  is_publish: 'is_publish',
  Timestamp: 'Timestamp'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  about: 'about',
  acp_log_operations: 'acp_log_operations',
  ads: 'ads',
  ads_label_values: 'ads_label_values',
  ads_orders: 'ads_orders',
  app: 'app',
  apps: 'apps',
  banner: 'banner',
  branch: 'branch',
  career: 'career',
  career_applicants: 'career_applicants',
  client: 'client',
  contact: 'contact',
  countries: 'countries',
  customer: 'customer',
  footer: 'footer',
  form_fields: 'form_fields',
  forms: 'forms',
  gallery: 'gallery',
  global_settings: 'global_settings',
  localization: 'localization',
  logs_operations: 'logs_operations',
  nav: 'nav',
  news: 'news',
  page_label_values: 'page_label_values',
  page_links: 'page_links',
  page_orders: 'page_orders',
  page_visitors: 'page_visitors',
  pages: 'pages',
  partner: 'partner',
  plans: 'plans',
  plans_features: 'plans_features',
  portfolio: 'portfolio',
  product: 'product',
  product_brands: 'product_brands',
  product_categories: 'product_categories',
  product_features: 'product_features',
  product_form_label_options: 'product_form_label_options',
  product_form_labels: 'product_form_labels',
  product_images: 'product_images',
  product_orders: 'product_orders',
  product_prices: 'product_prices',
  project: 'project',
  project_forms: 'project_forms',
  project_orders: 'project_orders',
  reseller: 'reseller',
  scripts_code: 'scripts_code',
  scripts_conversion: 'scripts_conversion',
  section_colors: 'section_colors',
  sections: 'sections',
  service: 'service',
  service_orders: 'service_orders',
  sessions: 'sessions',
  settings: 'settings',
  slider: 'slider',
  social_media: 'social_media',
  sub_customer: 'sub_customer',
  subscription: 'subscription',
  subscription_history: 'subscription_history',
  team: 'team',
  terms_and_conditions: 'terms_and_conditions',
  users: 'users',
  users_roles: 'users_roles',
  videobanner: 'videobanner',
  visitor: 'visitor',
  website_activity_template: 'website_activity_template',
  website_activity_type: 'website_activity_type',
  website_app: 'website_app',
  website_category: 'website_category',
  website_item: 'website_item',
  website_scripts: 'website_scripts',
  websites: 'websites'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
