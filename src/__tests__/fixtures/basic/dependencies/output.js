function _dependencies2() { _child3() || _child4(); }

;

function _child4() { _grandchild2(); }

;

function _grandchild2() { return "grandchild"; }

;

function _child3() { return "child"; }

;

function _dependencies() { _child() || _child2(); }

;

function _child2() { _grandchild(); }

;

function _grandchild() { return "grandchild"; }

;

function _child() { return "child"; }

;