<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\ContainerBNba9Mj\srcApp_KernelDevDebugContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/ContainerBNba9Mj/srcApp_KernelDevDebugContainer.php') {
    touch(__DIR__.'/ContainerBNba9Mj.legacy');

    return;
}

if (!\class_exists(srcApp_KernelDevDebugContainer::class, false)) {
    \class_alias(\ContainerBNba9Mj\srcApp_KernelDevDebugContainer::class, srcApp_KernelDevDebugContainer::class, false);
}

return new \ContainerBNba9Mj\srcApp_KernelDevDebugContainer([
    'container.build_hash' => 'BNba9Mj',
    'container.build_id' => '7d2b2fd0',
    'container.build_time' => 1559567578,
], __DIR__.\DIRECTORY_SEPARATOR.'ContainerBNba9Mj');