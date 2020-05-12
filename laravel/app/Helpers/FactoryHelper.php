<?php

namespace App\Helpers;

use App\AdminUser;
use App\Salon;
use App\Service;
use Illuminate\Database\Eloquent\Model as ModelAlias;

/**
 * Class FactoryHelper
 *
 * Provide helpers to Factories
 */
class FactoryHelper
{

    /**
     * Used to retrieve or create an element
     *
     * @return ModelAlias|mixed
     */
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
