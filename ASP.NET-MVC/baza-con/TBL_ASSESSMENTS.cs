//------------------------------------------------------------------------------
// <auto-generated>
//    Этот код был создан из шаблона.
//
//    Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//    Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace schoolDbMvc.baza_con
{
    using System;
    using System.Collections.Generic;
    
    public partial class TBL_ASSESSMENTS
    {
        public int ID { get; set; }
        public int SUBJECT_ID { get; set; }
        public int STUDENS_ID { get; set; }
        public string DATE { get; set; }
        public string ASSESSMENT { get; set; }
        public string CLASS_NAME { get; set; }
    }
}
