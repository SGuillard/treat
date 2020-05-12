<?php

namespace App\Helpers;

use App\AdminUser;
use App\Salon;
use App\Service;

/**
 * Class FactoryHelper
 */
class FactoryHelper
{

    public static function getSalon()
    {
        $salon = Salon::first();
        return $salon ?? factory('App\Salon')->create();
    }

    public static function getAdminUser()
    {
        $adminUser = AdminUser::first();
        return $adminUser ?? factory('App\AdminUser')->create();
    }

    public static function getService()
    {
        $service = Service::first();
        return $service ?? factory('App\Service')->create();
    }

}
